import { icons } from '@/constant';
import { GoogleInputProps } from '@/types/type';
import React from 'react';
import { Image, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useGoogleAutocomplete } from '@appandflow/react-native-google-autocomplete';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const { locationResults, term, setTerm, searchDetails } =
    useGoogleAutocomplete(googlePlacesApiKey!, {
      debounce: 300,
      language: 'en',
    });

  return (
    <View
      className={`relative z-50 flex flex-col rounded-xl ${containerStyle} mb-5`}
    >
      {/* Champ de saisie */}
      <View className="flex-row items-center rounded-full border border-general-400 px-3 py-2">
        <Image
          source={icon ? icon : icons.search}
          className="mr-2 h-6 w-6"
          resizeMode="contain"
        />
        <TextInput
          placeholder={initialLocation ?? 'Where do you want to go?'}
          placeholderTextColor="gray"
          value={term}
          onChangeText={setTerm}
          style={{
            flex: 1,
            backgroundColor: textInputBackgroundColor ?? 'white',
            borderRadius: 20,
            fontSize: 16,
            fontWeight: '600',
            paddingVertical: 6,
            paddingHorizontal: 8,
          }}
        />
      </View>

      {/* Résultats */}
      {locationResults.map((loc) => (
        <TouchableOpacity
          key={loc.place_id}
          onPress={async () => {
            const details = await searchDetails(loc.place_id);
            if (!details) return;

            handlePress?.({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: details.formatted_address,
            });
          }}
          style={{
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
          }}
        >
          <Text style={{ fontWeight: '600' }}>
            {loc.structured_formatting.main_text}
          </Text>
          <Text style={{ color: 'gray' }}>
            {loc.structured_formatting.secondary_text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GoogleTextInput;
