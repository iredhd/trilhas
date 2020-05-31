import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';

import { DefaultColors } from '../styles';
import CircularImage from './CircularImage';
import Typography from './Typography';
import Button from './Button';
import Badge from './Badge';

import profileImage from '../../assets/profile.jpg';

const Menu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const drawerIsOpen = useIsDrawerOpen();

  const [menuOptions, setMenuOptions] = useState([{
    name: 'Home',
    label: 'Home',
    badge: null,
    action: () => {
      navigation.navigate('Home');
    },
  }, {
    name: 'Profile',
    label: 'Minhas informações',
    badge: null,
    action: () => {
      navigation.navigate('Profile');
    },
  }, {
    name: 'Chats',
    label: 'Conversas',
    badge: 5,
    action: () => {
      navigation.navigate('Chats');
    },
  },
  // {
  //   name: 'checklists',
  //   label: 'Checklists',
  //   badge: null,
  //   action: () => { },
  // }, {
  //   name: 'notifications',
  //   label: 'Notificações',
  //   badge: null,
  //   action: () => { },
  // },
  // {
  //   name: 'settings',
  //   label: 'Configurações',
  //   badge: null,
  //   action: () => { },
  // },
  {
    name: 'logout',
    label: 'Sair',
    badge: null,
    action: () => { },
  }]);

  useEffect(() => {
    if (drawerIsOpen) {
      setMenuOptions(menuOptions.map((option) => ({
        ...option,
        disabled: option.name === route.state.routeNames[route.state.index],
      })));
    }
  }, [drawerIsOpen]);

  return (
    <View style={styles.menuContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <CircularImage
            radius={75}
            image={profileImage}
          />
        </View>
        <View style={styles.profileInformationContainer}>
          <Typography
            fontWeight="bold"
            fontSize={22}
          >
            Ighor Redhd
          </Typography>
          <Typography>
            Santos, SP - Brazil
          </Typography>
        </View>
      </View>
      <FlatList
        data={menuOptions}
        keyExtractor={({ name }) => name}
        renderItem={MenuOption}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.optionsContainer}
      />
    </View>
  );
};

const MenuOption = ({ item }) => (
  <View style={styles.optionContainer}>
    <View style={styles.optionButtonContainer}>
      <Button
        value={item.label}
        onPress={item.action}
        disabled={item.disabled}
      />
    </View>
    {item.badge && (
      <Badge value={item.badge} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getStatusBarHeight() + 55,
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: getStatusBarHeight(),
    backgroundColor: `rgb(${DefaultColors.secondary})`,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    marginBottom: -7,
    zIndex: 1,
    shadowColor: `rgb(${DefaultColors.secondary})`,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.5,
  },
  menuContainer: {
    paddingTop: '20%',
    backgroundColor: `rgb(${DefaultColors.primary})`,
    height: '110%',
    width: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 15,
    borderBottomWidth: 5,
    borderBottomColor: `rgb(${DefaultColors.secondary})`,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileInformationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  optionButtonContainer: {
    flex: 1,
  },
});

MenuOption.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default Menu;
