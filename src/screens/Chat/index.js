import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import {
  StyleSheet, FlatList, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { PrivateRoute, LoadingWrapper } from '../../components';
import { Header, Footer, Message } from './components';
import { User, Chat as ChatService } from '../../services';
import { useChat } from '../../hooks';

const Chat = () => {
  const route = useRoute();
  const [chatId, setChatId] = useState(null);
  const [chat, sendMessage, isLoadingChat] = useChat(chatId);

  const [profile, setProfile] = useState({
    isLoading: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef(null);

  const loadProfile = useCallback(async (id) => {
    setProfile({
      ...profile,
      isLoading: true,
    });

    const result = await User.getUser(id);

    setProfile({
      isLoading: false,
      ...result,
    });
  });

  const loadMessages = useCallback(async (userToChat) => {
    setIsLoading(true);
    const chatID = await ChatService.getChatId(userToChat);
    setChatId(chatID);
    setIsLoading(false);
  });

  useEffect(() => {
    loadProfile(route.params.id);
    loadMessages(route.params.id);
  }, [route.params.id]);

  return (
    <PrivateRoute>
      <LoadingWrapper isLoading={isLoading || isLoadingChat}>
        <Header profile={profile} />
        <FlatList
          inverted
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
        <Footer
          onSubmitMessage={sendMessage}
        />
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
