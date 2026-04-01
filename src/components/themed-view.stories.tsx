import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { ThemedView } from './themed-view';

const meta = {
  component: ThemedView,
  argTypes: {
    children: { control: false },
  },
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
  render: (args) => (
    <ThemedView {...args} style={{ padding: 24, borderRadius: 12 }}>
      <Text>Default background</Text>
    </ThemedView>
  ),
};

export const BackgroundElement: Story = {
  args: {
    type: 'backgroundElement',
  },
  render: (args) => (
    <ThemedView {...args} style={{ padding: 24, borderRadius: 12 }}>
      <Text>Element background</Text>
    </ThemedView>
  ),
};

export const BackgroundSelected: Story = {
  args: {
    type: 'backgroundSelected',
  },
  render: (args) => (
    <ThemedView {...args} style={{ padding: 24, borderRadius: 12 }}>
      <Text>Selected background</Text>
    </ThemedView>
  ),
};
