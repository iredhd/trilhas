import React from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';
import Button from './Button';
import Typography from './Typography';

const PopUp = ({
  isVisible, title, body, options, onBackdropPress,
}) => (
  <Modal
    useNativeDriver
    isVisible={isVisible}
    style={styles.container}
    onBackdropPress={onBackdropPress}
  >
    <View style={styles.popUpContainer}>
      <View style={styles.popUpTitleContainer}>
        <Typography
          fontWeight="bold"
          fontSize={22}
        >
          {title}
        </Typography>
      </View>
      <View style={styles.popUpBodyContainer}>
        <Typography>
          {body}
        </Typography>
      </View>
      <View style={[
        styles.popUpButtonContainer,
        options.length === 1 && { justifyContent: 'flex-end' },
      ]}
      >
        {options.map((item, index) => (
          <Button
            key={index.toString()}
            value={item.label}
            onPress={item.onPress}
          />
        ))}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpContainer: {
    borderColor: `rgb(${DefaultColors.secondary})`,
    borderWidth: 3,
    borderRadius: 15,
    backgroundColor: `rgb(${DefaultColors.tertiary})`,
    width: '90%',
  },
  popUpTitleContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: `rgb(${DefaultColors.secondary})`,
  },
  popUpBodyContainer: {
    padding: 10,
  },
  popUpButtonContainer: {
    padding: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

PopUp.defaultProps = {
  onBackdropPress: () => {},
};

PopUp.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  onBackdropPress: PropTypes.func,
};

export default PopUp;
