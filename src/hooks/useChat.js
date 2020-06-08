import firebase from 'firebase';
import { useState, useCallback, useEffect } from 'react';
import moment from 'moment';

const useChat = (chatId) => {
  const db = firebase.database();
  const [chatRef, setChatRef] = useState(null);

  const [chat, setChat] = useState([]);

  const handleNewMessageReceived = useCallback((item) => {
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

    newChat = newChat.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return setChat(newChat);
  });

  const sendMessage = useCallback((message) => {
    const ownerId = firebase.auth().currentUser.uid;

    chatRef.push({
      user_id: ownerId,
      moment: (new Date()).getTime(),
      message,
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
  }, [chatId]);

  return [
    chat,
    sendMessage,
  ];
};

export default useChat;
