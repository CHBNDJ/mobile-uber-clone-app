import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
type Props = {
  label: string;
  onPress: () => void;
};

const CustomButton = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity
      className={`mt-8 w-11/12 items-center justify-center rounded-full bg-primary-500 py-5 shadow-md shadow-neutral-400/70`}
      onPress={onPress}
    >
      <Text className="text-center font-JakartaBold text-lg text-white">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
