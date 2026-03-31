import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { HintRow } from './hint-row';

const meta = {
  component: HintRow,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HintRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Custom: Story = {
  args: {
    title: 'Check out',
    hint: 'components/pokemon-card.tsx',
  },
};
