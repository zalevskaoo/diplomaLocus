import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                title: 'LOCUS',
              }}
            />

            <Stack.Screen
              name="modal"
              options={{
                presentation: 'modal',
                title: 'LOCUS',
              }}
            />
          </Stack>

          <StatusBar style="dark" backgroundColor="#E8E5DA" />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}