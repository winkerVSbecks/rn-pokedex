import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { Collapsible } from './collapsible';

const meta = {
  component: Collapsible,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'More Information',
    children: <Text>This is the collapsible content that is revealed when expanded.</Text>,
  },
};

export const LongContent: Story = {
  args: {
    title: 'Pokemon Stats Explained',
    children: (
      <Text>
        Base stats are an important defining characteristic of each Pokemon species. Each Pokemon has
        a value for each of the six stats: HP, Attack, Defense, Special Attack, Special Defense, and
        Speed.
      </Text>
    ),
  },
};
