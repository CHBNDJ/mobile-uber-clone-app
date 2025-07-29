import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { onboarding } from '@/constant';
import CustomButton from '@/components/CustomButton';

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex === onboarding.length - 1) {
      router.replace('/(auth)/sign-up');
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between">
        <TouchableOpacity
          onPress={() => {
            router.replace('/(auth)/sign-up');
          }}
          className="flex w-full items-end justify-end px-10 py-5"
        >
          <Text className="font-JakartaBold text-lg text-black">Skip</Text>
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center">
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={
              <View className="mx-1 h-1 w-8 rounded-full bg-secondary-300" />
            }
            activeDot={
              <View className="bg-primary mx-1 h-1 w-8 rounded-full bg-primary-500" />
            }
            onIndexChanged={(index) => setActiveIndex(index)}
          >
            {onboarding.map((item) => (
              <View key={item.id} className="items-center justify-center p-5">
                <Image
                  source={item.image}
                  className="h-[300px] w-full"
                  resizeMode="contain"
                />

                <View className="mt-10 flex-col items-center justify-center gap-4 ">
                  <Text className="mx-10 text-center font-JakartaBold text-3xl text-black">
                    {item.title}
                  </Text>
                  <Text
                    className="mx-10 text-center font-JakartaMedium text-lg tracking-wide text-general-200"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </Swiper>
        </View>
        <View className="items-center px-6 pb-12">
          <CustomButton
            label={
              activeIndex === onboarding.length - 1 ? 'Get Started' : 'Next'
            }
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
