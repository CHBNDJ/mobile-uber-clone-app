import { GoogleInputProps } from '@/types/type';
import React from 'react';
import { Text, View } from 'react-native';

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => (
  <View
    className={`relative z-50 flex flex-row items-center justify-center rounded-xl ${containerStyle} mb-5`}
  >
    <Text>Search</Text>
  </View>
);

export default GoogleTextInput;
