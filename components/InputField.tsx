import {
  View,
  Text,
  TextInputProps,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';

type Props = {
  label: string;
  icon?: 'user' | 'mail' | 'password';
} & TextInputProps;

const iconSources = {
  user: require('@/assets/icons/person.png'),
  mail: require('@/assets/icons/email.png'),
  password: require('@/assets/icons/lock.png'),
};

const InputField = ({ label, icon, ...props }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = icon === 'password';
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full gap-4">
          <Text className="font-JakartaSemiBold text-base text-secondary-900">
            {label}
          </Text>
          <View
            className={`flex flex-row items-center gap-3 rounded-full bg-general-500 p-5 ${isFocused ? 'border-2 border-primary-500' : 'border border-neutral-100'}`}
          >
            {icon && (
              <Image
                source={iconSources[icon || 'user']}
                className="h-6 w-6"
                resizeMode="contain"
              />
            )}

            <TextInput
              className="w-11/12 text-left font-JakartaMedium text-[15px] tracking-wide"
              placeholder="#ADADAD"
              autoCapitalize="none"
              secureTextEntry={isPassword}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
