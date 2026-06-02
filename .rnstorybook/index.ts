import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerRootComponent } from 'expo';

import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
  // Chromatic drives Storybook over websockets. These are baked in at build
  // time: the EAS `storybook` profile points them at Chromatic's capture
  // host; local dev falls back to the metro channel server on localhost.
  enableWebsockets: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
  host: process.env.EXPO_PUBLIC_STORYBOOK_WEBSOCKET_HOST || 'localhost',
  port: parseInt(process.env.EXPO_PUBLIC_STORYBOOK_WEBSOCKET_PORT || '7007', 10),
  secured: process.env.EXPO_PUBLIC_STORYBOOK_WEBSOCKET_SECURED === 'true',
  onDeviceUI: process.env.EXPO_PUBLIC_STORYBOOK_DISABLE_UI !== 'true',
  shouldPersistSelection: false,
});

// withStorybook swaps the app entry (expo-router/entry) for this file when
// storybook is enabled, so it must register the root component itself.
registerRootComponent(StorybookUIRoot);

export default StorybookUIRoot;
