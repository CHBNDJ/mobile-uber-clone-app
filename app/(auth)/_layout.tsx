// import { Stack } from "expo-router";

// export default function Layout() {
//   return (
//     <Stack>
//       <Stack.Screen name="welcome" options={{ headerShown: false }} />
//       <Stack.Screen name="sign-up" options={{ headerShown: false }} />
//       <Stack.Screen name="sign-in" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
