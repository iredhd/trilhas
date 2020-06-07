import React, { useCallback } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { Typography, CircularImage } from '../../../components';
import { CardStyles } from '../../../styles';
import { addGuideSearched } from '../../../store/actions/User';

const GuideCard = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCardPress = useCallback(() => {
    dispatch(addGuideSearched(item));
    navigation.navigate('Profile', {
      id: item.id,
    });
  });

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={handleCardPress}
      >
        <View style={styles.imageContainer}>
          <CircularImage
            image={item.profilePicture}
            radius={35}
          />
        </View>
        <View style={styles.infomationContainer}>
          <Typography
            fontWeight="bold"
            fontSize={18}
            numberOfLines={1}
          >
            {item.name}
          </Typography>
          <Typography
            fontSize={16}
          >
            {item.cityName}
          </Typography>
          <Typography
            fontSize={16}
            numberOfLines={1}
          >
            {item.bio}
          </Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CardStyles,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '100%',
  },
  imageContainer: {
    marginRight: 10,
  },
  infomationContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
});

GuideCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default GuideCard;
