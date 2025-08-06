import { View, Text, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constant';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { fetchAPI } from '@/lib/fetch';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdSessionId, setCreatedSessionId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    mail: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.mail,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err: any) {
      console.error('Sign up error:', JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (result.status === 'complete') {
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.mail,
            clerkId: result.createdUserId,
          }),
        });
        await setActive({ session: result.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({
          ...verification,
          error: 'Verification failed',
          state: 'failed',
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-64 w-full">
          <Image source={images.signUpCar} className="z-0 h-64 w-full" />
          <Text className="absolute bottom-5 left-6 font-JakartaSemiBold text-2xl text-secondary-900">
            Create Your Account
          </Text>
        </View>

        <View className="flex-col items-center gap-4 p-5">
          <InputField
            label="Name"
            icon="user"
            placeholder="Enter name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

          <InputField
            label="Email"
            icon="mail"
            placeholder="Enter email"
            value={form.mail}
            onChangeText={(value) => setForm({ ...form, mail: value })}
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
          <CustomButton label="Sign Up" onPress={onSignUpPress} />

          <View className="w-9/12 flex-row items-center justify-center">
            <View className="h-0.5 w-1/2 bg-general-100/20" />
            <Text className="mx-5 font-JakartaSemiBold text-base text-secondary-900">
              Or
            </Text>
            <View className="h-0.5 w-1/2 bg-general-100/20" />
          </View>

          <OAuth />

          <Link
            href="/sign-in"
            className="font-JakartaMedium text-base tracking-wide text-general-200"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log in</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          onModalHide={() => {
            if (verification.state === 'success') setShowSuccessModal(true);
          }}
        >
          <View className="min-h-96 gap-4 rounded-2xl bg-white px-6 py-9">
            <View className="mb-3 gap-2">
              <Text className="font-JakartaBold text-2xl text-secondary-900">
                Verification
              </Text>
              <Text className="font-Jakarta tracking-wide text-general-200">
                We've sent a verification code to {form.mail}
              </Text>
            </View>

            <InputField
              label="Code"
              icon="password"
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />

            {verification.error && (
              <Text className="px-6 text-sm text-red-500">
                {verification.error}
              </Text>
            )}
            <View className="mt-8 items-center">
              <CustomButton label="Verify Email" onPress={onVerifyPress} />
            </View>
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="min-h-80 items-center rounded-2xl bg-white px-7 py-9">
            <Image source={images.check} className="mx-auto my-5 h-28 w-28" />
            <View className="mx-10 flex-col items-center justify-center gap-3.5">
              <Text className="font-JakartaBold text-2xl text-secondary-900">
                Verified!
              </Text>
              <Text className="text-center font-Jakarta text-lg tracking-wide text-general-200">
                You have successfully verified your account.
              </Text>
            </View>
            <CustomButton
              label="Browse Home"
              onPress={async () => {
                if (createdSessionId) {
                  router.replace('/(root)/(tabs)/home');
                }
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
