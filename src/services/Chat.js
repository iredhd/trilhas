import firebase from 'firebase';

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
}

export default Chat;
