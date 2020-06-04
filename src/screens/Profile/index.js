import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import { PrivateRoute, LoadingWrapper, RefreshableScrollView } from '../../components';
import { ProfileView, ProfileForm } from './components';
import { User } from '../../services';
import { registerData } from '../../store/actions/User';

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useRoute()?.params?.id || useSelector((state) => state.User.id);

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    id: '',
    isGuide: true,
    name: '',
    profilePicture: null,
    cityName: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadProfile = useCallback(async () => User.getUser(userId));

  const initialLoad = useCallback(async () => {
    setIsLoading(true);
    const user = await loadProfile();
    setProfile(user);
    setIsLoading(false);
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    const result = await loadProfile();
    setProfile(result);
    setIsRefreshing(false);
  });

  const handleToggleProfileScreen = useCallback(() => {
    setIsEditing(!isEditing);
  });

  const handleSubmit = useCallback(async (form) => {
    setIsLoading(true);
    let userUpdated = await User.upsertUser(form);

    if (form.profilePictureBase64) {
      const { profilePicture, error } = await User.upsertProfilePicture(userUpdated.id, form.profilePictureBase64);

      if (!error) {
        userUpdated = {
          ...userUpdated,
          profilePicture,
        };
      }
    }

    initialLoad();
    handleToggleProfileScreen();
    dispatch(registerData(userUpdated));
  });

  useEffect(() => {
    setIsRefreshing(false);
    initialLoad();
  }, []);

  return (
    <PrivateRoute>
      <View style={styles.container}>
        <LoadingWrapper
          isLoading={isLoading}
        >
          {!isLoading && (
          <RefreshableScrollView
            contentContainerStyle={styles.profileContainer}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          >
            {
              isEditing ? (
                <ProfileForm
                  profile={profile}
                  toggleProfileScreen={handleToggleProfileScreen}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <ProfileView
                  profile={profile}
                  toggleProfileScreen={handleToggleProfileScreen}
                />
              )
            }
          </RefreshableScrollView>
          )}
        </LoadingWrapper>
      </View>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    paddingHorizontal: 15,
  },
  profileContainer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
});

export default Profile;
