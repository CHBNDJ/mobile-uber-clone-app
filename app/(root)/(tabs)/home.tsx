import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
    </SafeAreaView>
  );
}

const psql =
  'postgresql://neondb_owner:npg_hITnvBtF4Ri5@ep-noisy-term-a22lvn1r-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
