import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import Updates from 'expo-updates';

import { DefaultColors } from '../styles';
import CircularImage from './CircularImage';
import Typography from './Typography';
import Button from './Button';
import Badge from './Badge';
import { logout } from '../store/actions/Auth';
import PopUp from './PopUp';

const Menu = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const drawerIsOpen = useIsDrawerOpen();
  const userState = useSelector(({ User }) => User);

  const [user, setUser] = useState(userState);
  const [isLoadingVersion, setIsLoadingVersion] = useState(false);
  const [popUp, setPopUp] = useState({
    title: '',
    body: '',
    options: [],
  });

  const [menuOptions, setMenuOptions] = useState([{
    name: 'Home',
    label: 'Home',
    badge: null,
    disabled: false,
    disabledFunc: ({ actualRoute }) => actualRoute.state.routeNames[actualRoute.state.index] === 'Home',
    action: () => {
      navigation.navigate('Home');
    },
  }, {
    name: 'Profile',
    label: 'Minhas informações',
    badge: null,
    disabled: false,
    disabledFunc: ({ actualRoute, actualUserState }) => actualRoute.state.routes[actualRoute.state.index].name === 'Profile' && actualRoute.state.routes[actualRoute.state.index].params?.id === actualUserState.id,
    action: () => {
      navigation.navigate('Profile', {
        id: userState.id,
      });
    },
  }, {
    name: 'Chats',
    label: 'Conversas',
    badge: 5,
    disabled: false,
    disabledFunc: () => {
    },
    action: () => {
      navigation.navigate('Chats');
    },
  },
  {
    name: 'logout',
    label: 'Sair',
    badge: null,
    disabled: false,
    disabledFunc: () => {
      // return route.state.routeNames[route.state.index] === 'Home';
    },
    action: () => {
      dispatch(logout());
    },
  }]);

  const handleVersionVerification = useCallback(async () => {
    setPopUp({
      title: 'Aguarde...',
      body: 'Estamos verificando se existe uma nova versão para você.',
    });

    setIsLoadingVersion(true);

    try {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        setPopUp({
          title: 'Atualização necessária!',
          body: 'Existe uma nova versão disponível para você. Clique em OK para atualizar.',
          options: [{
            label: 'OK',
            onPress: async () => {
              setPopUp({
                title: 'Aguarde...',
                body: 'Fazendo download da nova versão do aplicativo',
              });

              await Updates.fetchUpdateAsync();

              setPopUp({
                title: 'Sucesso!',
                body: 'A nova versão já foi baixada, pressione "OK" para recarregar a aplicação.',
                options: [{
                  label: 'OK',
                  onPress: Updates.reloadAsync,
                }],
              });
            },
          }],
        });
      } else {
        setPopUp({
          title: 'Atualizado!',
          body: 'Seu aplicativo já está na versão atual.',
          options: [{
            label: 'OK',
            onPress: () => setIsLoadingVersion(false),
          }],
        });
      }
    } catch (e) {
      setPopUp({
        title: 'Ops!',
        body: 'Houve um erro na verificação da versão. Tente novamente mais tarde.',
        options: [{
          label: 'OK',
          onPress: () => setIsLoadingVersion(false),
        }],
      });
    }
  });

  useEffect(() => {
    if (drawerIsOpen) {
      setMenuOptions(menuOptions.map((option) => ({
        ...option,
        disabled: option.disabledFunc({
          actualRoute: route,
          actualUserState: userState,
        }),
      })));
    }
  }, [drawerIsOpen, route]);

  useEffect(() => {
    setUser(userState);
  }, [userState]);

  return (
    <View style={styles.menuContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <CircularImage
            radius={75}
            image={user.profilePicture}
          />
        </View>
        <View style={styles.profileInformationContainer}>
          <Typography
            fontWeight="bold"
            fontSize={22}
          >
            {user.name}
          </Typography>
          <Typography>
            {user.cityName}
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
      {!__DEV__ && (
      <View style={styles.versionContainer}>
        <Button
          onPress={handleVersionVerification}
          value={`Versão: ${Constants.manifest.version}`}
        />
      </View>
      )}
      <PopUp
        isVisible={isLoadingVersion}
        title={popUp.title}
        body={popUp.body}
        options={popUp.options}
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
  versionContainer: {
    alignItems: 'center',
  },
});

MenuOption.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default Menu;
