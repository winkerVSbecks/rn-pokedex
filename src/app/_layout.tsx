// import { AnimatedSplashOverlay } from '@/components/animated-icon';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

export const unstable_settings = {
  initialRouteName: storybookEnabled ? '(storybook)/index' : '(pages)/index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <AnimatedSplashOverlay /> */}
      <Stack>
        <Stack.Protected guard={storybookEnabled}>
          <Stack.Screen
            name="(storybook)/index"
            options={{ title: 'Storybook' }}
          />
        </Stack.Protected>
        <Stack.Screen name="(pages)/index" options={{ title: 'Pokédex' }} />
        <Stack.Screen name="pokemon/[id]" options={{ title: '' }} />
      </Stack>
    </ThemeProvider>
  );
}
