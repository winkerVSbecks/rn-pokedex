import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { SearchInput } from './search-input';

const meta = {
  component: SearchInput,
  argTypes: {
    onChangeText: { action: 'text changed' },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: '',
    onChangeText: () => {},
  },
};

export const WithValue: Story = {
  args: {
    value: 'Pikachu',
    onChangeText: () => {},
  },
};
