// import { View, Text, Image, ScrollView } from 'react-native';
// import React, { useState } from 'react';
// import { images } from '@/constant';
// import InputField from '@/components/InputField';
// import CustomButton from '@/components/CustomButton';
// import { Link } from 'expo-router';
// import OAuth from '@/components/OAuth';

// interface Props {
//   label: string;
//   icon?: 'user' | 'mail' | 'password';
//   placeholder?: string;
//   value?: string;
//   onChangeText?: (value: string) => void;
// }

// const SignIn = () => {
//   const [form, setForm] = useState({
//     mail: '',
//     password: '',
//   });

//   const onSignInPress = async () => {};

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="flex-1 bg-white">
//         <View className="relative h-64 w-full">
//           <Image source={images.signUpCar} className="z-0 h-64 w-full" />
//           <Text className="absolute bottom-5 left-6 font-JakartaSemiBold text-2xl text-secondary-900">
//             Welcome ✋
//           </Text>
//         </View>
//         <View className="flex-col items-center gap-4 p-5">
//           <InputField
//             label="Email"
//             icon="mail"
//             placeholder="Enter email"
//             value={form.mail}
//             onChangeText={(value) => setForm({ ...form, mail: value })}
//           />

//           <InputField
//             label="Password"
//             icon="password"
//             placeholder="Enter password"
//             value={form.password}
//             onChangeText={(value) => setForm({ ...form, password: value })}
//           />
//         </View>
//         <View className="flex-1 flex-col items-center justify-center gap-4">
//           <CustomButton label="Sign In" onPress={onSignInPress} />

//           <View className="w-9/12 flex-row items-center justify-center">
//             <View className="h-0.5 w-1/2 bg-general-100/20"></View>
//             <Text className="mx-5 font-JakartaSemiBold text-base text-secondary-900">
//               Or
//             </Text>
//             <View className="h-0.5 w-1/2 bg-general-100/20"></View>
//           </View>

//           <OAuth />
//           <Link
//             href="/sign-up"
//             className="mt-8 font-JakartaMedium text-base tracking-wide text-general-200"
//           >
//             <Text>Don't have an account? </Text>
//             <Text className="text-primary-500">Sign Up</Text>
//           </Link>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SignIn;

import { View, Text, Image, ScrollView, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { images } from '@/constant';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link, useRouter } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignIn, useAuth } from '@clerk/clerk-expo';

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (authLoaded && isSignedIn) {
      router.replace('/(root)/(tabs)/home');
    }
  }, [authLoaded, isSignedIn]);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    console.log('Trying to sign in with', form.email, form.password);

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(root)/(tabs)/home');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Error', 'Log in failed. Please try again.');
      }
    } catch (err: any) {
      console.error('SignIn error:', JSON.stringify(err, null, 2));
      Alert.alert(
        'Error',
        err.errors[0].longMessage || 'Something went wrong.',
      );
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-64 w-full">
          <Image source={images.signUpCar} className="z-0 h-64 w-full" />
          <Text className="absolute bottom-5 left-6 font-JakartaSemiBold text-2xl text-secondary-900">
            Welcome ✋
          </Text>
        </View>

        <View className="flex-col items-center gap-4 p-5">
          <InputField
            label="Email"
            icon="mail"
            placeholder="Enter email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            icon="password"
            placeholder="Enter password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        <View className="flex-1 flex-col items-center justify-center gap-4 px-5">
          <CustomButton label="Sign In" onPress={onSignInPress} />

          <View className="w-9/12 flex-row items-center justify-center">
            <View className="h-0.5 w-1/2 bg-general-100/20" />
            <Text className="mx-5 font-JakartaSemiBold text-base text-secondary-900">
              Or
            </Text>
            <View className="h-0.5 w-1/2 bg-general-100/20" />
          </View>

          <OAuth />

          <Link
            href="/sign-up"
            className="mt-8 font-JakartaMedium text-base tracking-wide text-general-200"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
