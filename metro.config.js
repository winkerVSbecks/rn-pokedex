const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// v10.4 withStorybook: when enabled, swaps the app entry for .rnstorybook and
// starts the websocket channel server (unless STORYBOOK_SERVER=false). CI
// builds set STORYBOOK_SERVER=false so the server doesn't hold the Node
// process open and hang EAS's config/fingerprint steps.
module.exports = withStorybook(config, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
  websockets: { port: 7007, host: 'localhost' },
});
