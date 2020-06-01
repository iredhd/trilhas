import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {
  Loading, Login, Home, GuideSearch, Profile, Chat, Chats,
} from '../screens';
import { Menu } from '../components';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Auth = () => (
  <Stack.Navigator
    initialRouteName="Loading"
    headerMode="none"
    gestureEnabled={false}
  >
    <Stack.Screen
      name="Loading"
      component={Loading}
    />
    <Stack.Screen
      name="Login"
      component={Login}
    />
  </Stack.Navigator>
);

const App = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={() => <Menu />}
  >
    <Drawer.Screen
      name="Home"
      component={Home}
    />
    <Drawer.Screen
      name="GuideSearch"
      component={GuideSearch}
    />
    <Drawer.Screen
      name="Profile"
      component={Profile}
    />
    <Drawer.Screen
      name="Chat"
      component={Chat}
    />
    <Drawer.Screen
      name="Chats"
      component={Chats}
    />
  </Drawer.Navigator>
);

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Auth"
      gestureEnabled={false}
    >
      <Stack.Screen
        name="Auth"
        component={Auth}
      />
      <Stack.Screen
        name="App"
        component={App}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
