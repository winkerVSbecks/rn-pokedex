import AsyncStorage from '@react-native-async-storage/async-storage';
import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
  // Required
  enableWebsockets: true,
  host: 'react-native.capture.chromatic.com',
  port: 7007,
  secured: true,
  // Recommended
  onDeviceUI: __DEV__,
  shouldPersistSelection: false,
});

export default StorybookUIRoot;
