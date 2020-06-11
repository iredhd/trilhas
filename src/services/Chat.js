import firebase from 'firebase';
import moment from 'moment';

import { Constants } from '../utils';

class Chat {
  static async getChatId(userToChat) {
    const user = firebase.auth().currentUser.uid;

    const userLoggedRef = firebase.firestore().collection('users').doc(user);
    const userToChatRef = firebase.firestore().collection('users').doc(userToChat);
    const chatCollectionRef = firebase.firestore().collection('chats');

    let chatId = null;

    const firstTry = await chatCollectionRef
      .where('user_1', '==', userLoggedRef)
      .where('user_2', '==', userToChatRef)
      .get();

    firstTry.forEach((chat) => {
      chatId = chat.id;
    });

    if (!chatId) {
      const secondTry = await chatCollectionRef
        .where('user_1', '==', userToChatRef)
        .where('user_2', '==', userLoggedRef)
        .get();

      secondTry.forEach((chat) => {
        chatId = chat.id;
      });
    }

    if (!chatId) {
      const newChatRef = chatCollectionRef.doc();
      await newChatRef.set({
        user_1: userLoggedRef,
        user_2: userToChatRef,
      }, { merge: true });

      chatId = newChatRef.id;
    }

    return chatId;
  }

  static async getUserChats({ name = '', page = 0 } = {}) {
    const perPage = Constants.LIMIT_ITEMS_PER_PAGE;
    const offset = page * perPage;
    const limit = offset + perPage;

    const db = firebase.firestore();
    const realTimeDb = firebase.database();
    const userLoggedId = firebase.auth().currentUser.uid;

    const userLoggedRef = db.collection('users').doc(userLoggedId);
    const chatsRef = db.collection('chats');

    try {
      const firstTry = await chatsRef.where('user_1', '==', userLoggedRef).get();
      const secondTry = await chatsRef.where('user_2', '==', userLoggedRef).get();

      let chats = this.processChatData(secondTry, firstTry);

      chats = await Promise.all(chats.map(async (chat) => {
        const userRef = await chat.userRef.get();
        const user = userRef.data();

        return ({
          id: chat.id,
          user: {
            id: userRef.id,
            ...user,
          },
          last_message_moment: new Date(chat.last_message_moment),
        });
      }));

      let filteredChats = chats
        .filter((chat) => chat.user.name.toLowerCase().indexOf(name.toLowerCase()) >= 0)
        .filter((_, index) => index >= offset && index < limit)
        .sort((a, b) => b.last_message_moment - a.last_message_moment);

      filteredChats = await Promise.all(filteredChats.map((chat) => new Promise((resolve) => {
        const chatRef = realTimeDb.ref(`chats/${chat.id}/messages`);
        chatRef.on('value', (messages) => {
          chatRef.off('value');
          let lastMessage = {};

          messages.forEach((messageRef) => {
            const message = messageRef.val();
            if (!lastMessage.moment || new Date(lastMessage.moment) < new Date(message.moment)) {
              lastMessage = {
                ...message,
              };
            }
          });

          resolve({
            ...chat,
            message: lastMessage?.message || '',
            last_message_moment: lastMessage?.moment || null,
          });
        });
      })));

      return filteredChats.map((chat) => this.mapChatData(chat));
    } catch (e) {
      return {
        error: 'Erro na busca das conversas',
      };
    }
  }

  static processChatData(...rest) {
    const loggedUserId = firebase.auth().currentUser.uid;
    const chats = [];

    rest.forEach((chatRef) => {
      if (chatRef.isEmpty) {
        return;
      }

      chatRef.forEach((chat) => {
        const chatData = chat.data();
        const userRef = chatData.user_1.id === loggedUserId ? chatData.user_2 : chatData.user_1;

        const mappedChat = {
          id: chat.id,
          last_message_moment: chatData.last_message_moment,
          userRef,
        };

        chats.push(mappedChat);
      });
    });

    return chats;
  }

  static mapChatData(chat) {
    return ({
      id: chat.id,
      userId: chat.user.id,
      name: chat.user.name,
      profilePicture: chat.user.profile_picture,
      cityName: chat.user.city_name,
      lastMessageMoment: moment(chat.last_message_moment).format('DD/MM/YYYY HH:mm:ss'),
      message: chat.message,
    });
  }
}

export default Chat;
