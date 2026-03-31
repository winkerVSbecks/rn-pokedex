import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { ThemedView } from './themed-view';

const meta = {
  component: ThemedView,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ThemedView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { padding: 24, borderRadius: 12 },
    children: <Text>Default background</Text>,
  },
};

export const BackgroundElement: Story = {
  args: {
    type: 'backgroundElement',
    style: { padding: 24, borderRadius: 12 },
    children: <Text>Element background</Text>,
  },
};

export const BackgroundSelected: Story = {
  args: {
    type: 'backgroundSelected',
    style: { padding: 24, borderRadius: 12 },
    children: <Text>Selected background</Text>,
  },
};
