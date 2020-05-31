import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { PrivateRoute, LoadingWrapper, RefreshableScrollView } from '../../components';
import { ProfileView, ProfileForm } from './components';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadProfile = useCallback(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(),
        isGuide: true,
        name: 'Ighor Redhd',
        profilePicture: 'https://instagram.fssz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82164289_3835525919805869_7911970237640081408_n.jpg?_nc_ht=instagram.fssz1-1.fna.fbcdn.net&_nc_ohc=gQP0WoRPsx8AX9JKs-F&oh=1bfd73a3604a0e5d3c4d2d18eaf1c7ba&oe=5EFBA0FB',
        cityName: 'Santos, SP - Brazil',
        bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      });
    }, 1 * 1000);
  }));

  const initialLoad = useCallback(async () => {
    setIsLoading(true);
    const result = await loadProfile();
    setProfile(result);
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
