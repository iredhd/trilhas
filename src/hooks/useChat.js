import firebase from 'firebase';
import { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { Notifications } from '../services';

const useChat = (chatId) => {
  const db = firebase.database();
  const loggedUser = useSelector(({ User }) => User);

  const [chatRef, setChatRef] = useState(null);
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleNewMessageReceived = useCallback((item) => {
    setIsLoading(false);
    const messages = item.val();

    if (!messages) {
      return setChat([]);
    }

    let newChat = [];

    Object.keys(messages).forEach((message) => {
      newChat.push({
        id: message,
        ownerId: messages[message].user_id,
        message: messages[message].message,
        timestamp: messages[message].moment,
        moment: moment(messages[message].moment).format('DD/MM/YYYY HH:mm:ss'),
      });
    });

    newChat = newChat.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return setChat(newChat);
  });

  const sendMessage = useCallback((message) => {
    const ownerId = firebase.auth().currentUser.uid;

    chatRef.push({
      user_id: ownerId,
      moment: (new Date()).getTime(),
      message,
    });

    Notifications.sendNotification({
      title: loggedUser.name,
      message,
      deviceIds: user.pushIds,
      data: {
        type: Notifications.NotificationTypes.NOTIFICATION_CHAT_TYPE,
        id: ownerId,
      },
    });
  });

  const loadUser = useCallback(async (id) => {
    const chatData = (await firebase.firestore().collection('chats').doc(id).get()).data();
    const userRef = chatData.user_1.id === firebase.auth().currentUser.uid ? chatData.user_2 : chatData.user_1;

    let userToLoad = await userRef.get();
    userToLoad = userToLoad.data();

    setUser({
      id: userRef.id,
      name: userToLoad.name,
      pushIds: !userToLoad.devices ? [] : userToLoad.devices.map((device) => device.push_token),
    });
  });

  useEffect(() => {
    setChat([]);

    if (!chatId) {
      return;
    }

    const newChatRef = db.ref(`chats/${chatId}/messages`);
    setChatRef(newChatRef);
    newChatRef.on('value', handleNewMessageReceived);
    loadUser(chatId);
  }, [chatId]);

  return [
    chat,
    sendMessage,
    isLoading,
  ];
};

export default useChat;
