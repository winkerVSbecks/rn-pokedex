import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { StatBar } from './stat-bar';

const meta = {
  component: StatBar,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof StatBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HighStat: Story = {
  args: {
    label: 'HP',
    value: 200,
    maxValue: 255,
    color: '#4CAF50',
  },
};

export const MediumStat: Story = {
  args: {
    label: 'ATK',
    value: 120,
    maxValue: 255,
    color: '#EE8130',
  },
};

export const LowStat: Story = {
  args: {
    label: 'DEF',
    value: 45,
    maxValue: 255,
    color: '#6390F0',
  },
};

export const CustomColor: Story = {
  args: {
    label: 'SPD',
    value: 180,
    maxValue: 255,
    color: '#F95587',
  },
};
