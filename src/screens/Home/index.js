import React, { useState } from 'react';
import {
  View, StyleSheet, ImageBackground, FlatList, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import { PrivateRoute, Typography } from '../../components';
import { DefaultColors, CardStyles } from '../../styles';
import homeBackground from '../../assets/home-background.jpg';

const Home = () => {
  const navigation = useNavigation();

  const [homeOptions] = useState([{
    name: 'find_a_guide',
    label: 'Encontrar um guia',
    disabled: false,
    action: () => navigation.navigate('GuideSearch'),
  }, {
    name: 'find_a_group',
    label: 'Encontrar um grupo\n(em breve)',
    disabled: true,
    action: () => { },
  }, {
    name: 'find_a_trail',
    label: 'Encontrar uma trilha\n(em breve)',
    disabled: true,
    action: () => { },
  }]);

  return (
    <PrivateRoute>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={homeBackground}
            style={styles.image}
          />
        </View>
        <FlatList
          data={homeOptions}
          keyExtractor={({ name }) => name}
          renderItem={MenuOption}
          contentContainerStyle={styles.optionsContainer}
        />
      </View>
    </PrivateRoute>
  );
};

const MenuOption = ({ item }) => (
  <View
    style={item.disabled && { opacity: 0.25 }}
  >
    <TouchableOpacity
      style={styles.optionContainer}
      disabled={item.disabled}
      onPress={item.action}
    >
      <Typography
        fontWeight="bold"
        fontSize={24}
        textAlign="center"
      >
        {item.label}
      </Typography>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: '40%',
    backgroundColor: `rgb(${DefaultColors.secondary})`,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.6,
  },
  optionsContainer: {
    paddingTop: 15,
    flex: 1,
    alignItems: 'center',
  },
  optionContainer: {
    ...CardStyles,
  },
});

MenuOption.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default Home;
