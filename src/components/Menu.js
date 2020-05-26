import React, { useCallback, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';
import CircularImage from './CircularImage';
import IconButton from './IconButton';
import Typography from './Typography';
import Button from './Button';
import Badge from './Badge';

import profileImage from '../../assets/profile.jpg';

const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOptions, setMenuOptions] = useState([{
    name: 'profile',
    label: 'Minhas informações',
    badge: null,
    action: () => {},
  }, {
    name: 'chat',
    label: 'Conversas',
    badge: 5,
    action: () => {},
  }, {
    name: 'checklists',
    label: 'Checklists',
    badge: null,
    action: () => {},
  }, {
    name: 'notifications',
    label: 'Notificações',
    badge: null,
    action: () => {},
  }, {
    name: 'settings',
    label: 'Configurações',
    badge: null,
    action: () => {},
  }, {
    name: 'logout',
    label: 'Sair',
    badge: null,
    action: () => {},
  }]);

  const handleMenuToggle = useCallback(() => {
    setIsVisible(!isVisible);
  });

  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        onPress={handleMenuToggle}
        iconSize={50}
      />
      <Modal
        useNativeDriver
        isVisible={isVisible}
        onBackdropPress={handleMenuToggle}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
      >
        <View style={styles.menuContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <CircularImage
                radius={150}
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
            contentContainerStyle={styles.optionsContainer}
          />
        </View>
      </Modal>
    </View>
  );
};

const MenuOption = ({ item }) => (
  <View style={styles.optionContainer}>
    <View style={styles.optionButtonContainer}>
      <Button
        value={item.label}
        onPress={item.action}
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
    left: -20,
    position: 'absolute',
    width: '90%',
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
