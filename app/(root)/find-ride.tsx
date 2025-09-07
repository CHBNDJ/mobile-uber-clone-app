import { View, Text } from 'react-native';
import React from 'react';
import { useLocationStore } from '@/store';

const findRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <View>
      <Text>you are here: {userAddress}</Text>
      <Text>you are going to: {destinationAddress}</Text>
    </View>
  );
};

export default findRide;
