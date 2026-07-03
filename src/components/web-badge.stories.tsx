import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { WebBadge } from './web-badge';

const meta = {
  component: WebBadge,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof WebBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'WebBadge (Default)',
};
