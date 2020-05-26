import React, { useState } from 'react';
import {
  View, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import { PrivateRoute, Typography } from '../../components';
import { DefaultColors } from '../../styles';
import homeBackground from '../../../assets/home-background.jpg';

const Home = () => {
  const [homeOptions, setHomeOptions] = useState([{
    name: 'find_a_guide',
    label: 'Encontrar um guia',
    disabled: false,
    action: () => {},
  }, {
    name: 'find_a_group',
    label: 'Encontrar um grupo\n(em breve)',
    disabled: true,
    action: () => {},
  }, {
    name: 'find_a_trail',
    label: 'Encontrar uma trilha\n(em breve)',
    disabled: true,
    action: () => {},
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
    height: 80,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: `rgba(${DefaultColors.secondary}, 0.4)`,
  },
});

MenuOption.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default Home;
