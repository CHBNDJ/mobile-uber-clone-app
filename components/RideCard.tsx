import React from 'react';
import { Image, Text, View } from 'react-native';
import { Ride } from '@/types/type';
import { icons } from '@/constant';
import { formatDate, formatTime } from '@/lib/utils';

const RideCard = ({
  ride: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => (
  <View className="mb-3 flex flex-row items-center justify-center rounded-2xl bg-white shadow-sm shadow-neutral-300">
    <View className="flex flex-col items-center justify-center p-3">
      <View className="flex flex-row items-center justify-between">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="h-24 w-24 rounded-lg"
        />
        <View className="mx-5 flex flex-1 flex-col gap-y-5">
          <View className="flex flex-row items-center gap-x-2">
            <Image source={icons.to} className="h-5 w-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {origin_address}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <Image source={icons.point} className="h-6 w-6" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {destination_address}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-5 flex w-full flex-col items-start justify-center rounded-lg bg-general-500 p-3">
        <View className="mb-5 flex w-full flex-row items-center justify-between">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Date & Time
          </Text>
          <Text className="text-md font-JakartaMedium text-black">
            {formatDate(created_at)}, {formatTime(ride_time)}
          </Text>
        </View>
        <View className="mb-5 flex w-full flex-row items-center justify-between">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Driver
          </Text>
          <Text className="text-md font-JakartaMedium text-black">
            {driver.first_name} {driver.last_name}
          </Text>
        </View>
        <View className="mb-5 flex w-full flex-row items-center justify-between">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Car seats
          </Text>
          <Text className="text-md black font-JakartaMedium">
            {driver.car_seats}
          </Text>
        </View>
        <View className="mb-5 flex w-full flex-row items-center justify-between">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Payment Status
          </Text>
          <Text
            className={`text-md font-JakartaMedium capitalize text-general-400 ${payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`}
          >
            {payment_status}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default RideCard;
