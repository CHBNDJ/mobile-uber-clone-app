import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constant';

const OAuth = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <TouchableOpacity
      className="w-11/12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-300"
      onPress={handleGoogleSignIn}
    >
      <View className="flex-row items-center justify-center gap-3 px-4 py-5">
        <Image source={icons.google} className="h-6 w-6" resizeMode="contain" />
        <Text className="font-JakartaSemiBold text-base tracking-wide text-secondary-900">
          Log in with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OAuth;
