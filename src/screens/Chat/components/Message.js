import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Typography } from '../../../components';
import { DefaultColors } from '../../../styles';

const Message = ({ message, ownerId }) => {
  const userId = useSelector(({ User }) => User.id);

  return (
    <View style={[styles.container, { justifyContent: ownerId === userId ? 'flex-end' : 'flex-start' }]}>
      <View style={styles.messageContainer}>
        <Typography>
          {message}
        </Typography>
      </View>
    </View>
  );
};

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
  ownerId: PropTypes.string.isRequired,
};

export default Message;
