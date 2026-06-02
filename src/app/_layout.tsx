import { AnimatedSplashOverlay } from '@/components/animated-icon';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { registerDevMenuItems } from 'expo-dev-menu';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import StorybookUI from '../../.rnstorybook';

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

export const unstable_settings = {
  initialRouteName: '(pages)/index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    if (__DEV__) {
      registerDevMenuItems([
        {
          name: 'Go to Storybook',
          callback: () => {
            router.navigate('/(storybook)');
          },
        },
      ]);
    }
  }, [router]);

  // When building for Storybook/Chromatic, show Storybook at the root.
  // (withStorybook also swaps the app entry for .rnstorybook when enabled,
  // so this is the fallback path if the entry swap doesn't apply.)
  if (storybookEnabled) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StorybookUI />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack>
        <Stack.Protected guard={storybookEnabled || __DEV__}>
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
