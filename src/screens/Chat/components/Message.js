import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Typography } from '../../../components';
import { DefaultColors } from '../../../styles';

const Message = ({ message, ownerId }) => (
  <View style={[styles.container, { justifyContent: ownerId === '1' ? 'flex-end' : 'flex-start' }]}>
    <View style={styles.messageContainer}>
      <Typography>
        {message}
      </Typography>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
  },
  messageContainer: {
    maxWidth: '80%',
    backgroundColor: `rgba(${DefaultColors.secondary}, 0.4)`,
    borderRadius: 5,
    padding: 5,
  },
});

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
