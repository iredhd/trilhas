import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import {
  StyleSheet, FlatList, KeyboardAvoidingView, Platform,
} from 'react-native';

import { PrivateRoute, LoadingWrapper } from '../../components';
import { Header, Footer, Message } from './components';

const Chat = () => {
  const [profile, setProfile] = useState({
    isLoading: true,
  });
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef(null);

  const getProfile = useCallback(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(),
        isGuide: true,
        name: 'Ighor Redhd',
        profilePicture: 'https://instagram.fssz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82164289_3835525919805869_7911970237640081408_n.jpg?_nc_ht=instagram.fssz1-1.fna.fbcdn.net&_nc_ohc=gQP0WoRPsx8AX9JKs-F&oh=1bfd73a3604a0e5d3c4d2d18eaf1c7ba&oe=5EFBA0FB',
        cityName: 'Santos, SP - Brazil',
      });
    }, 1 * 1000);
  }));

  const getMessages = useCallback(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve([{
        id: Math.random().toString(),
        ownerId: Math.random().toString(),
        name: 'Ighor Redhd',
        message: ' 1- Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
      }, {
        id: Math.random().toString(),
        ownerId: '1',
        name: 'Ighor Redhd',
        message: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
      }, {
        id: Math.random().toString(),
        ownerId: Math.random().toString(),
        name: 'Ighor Redhd',
        message: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
      }, {
        id: Math.random().toString(),
        ownerId: '1',
        name: 'Ighor Redhd',
        message: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
      }, {
        id: Math.random().toString(),
        ownerId: Math.random().toString(),
        name: 'Ighor Redhd',
        message: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
      }]);
    }, 1 * 1000);
  }));

  const loadProfile = useCallback(async () => {
    setProfile({
      ...profile,
      isLoading: true,
    });

    const result = await getProfile();

    setProfile({
      isLoading: false,
      ...result,
    });
  });

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    const result = await getMessages();
    setChat(result);
    setIsLoading(false);
  });

  const scrollToBottom = useCallback(() => {
    chatRef.current.scrollToEnd();
  });

  useEffect(() => {
    loadProfile();
    loadMessages();
  }, []);

  return (
    <PrivateRoute>
      <Header profile={profile} />
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          onLayout={scrollToBottom}
          ref={chatRef}
          data={chat}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <Message message={item.message} ownerId={item.ownerId} />}
          contentContainerStyle={styles.chatContainer}
        />
      </LoadingWrapper>
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        behavior="padding"
      >
        <Footer />
      </KeyboardAvoidingView>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    paddingHorizontal: 15,
  },
});

export default Chat;
