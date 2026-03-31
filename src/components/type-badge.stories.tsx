import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { TypeBadge } from './type-badge';

const meta = {
  component: TypeBadge,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flexDirection: 'row' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TypeBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fire: Story = {
  args: { typeName: 'fire' },
};

export const Water: Story = {
  args: { typeName: 'water' },
};

export const Grass: Story = {
  args: { typeName: 'grass' },
};

export const Electric: Story = {
  args: { typeName: 'electric' },
};

export const Psychic: Story = {
  args: { typeName: 'psychic' },
};

export const Dragon: Story = {
  args: { typeName: 'dragon' },
};

export const Ghost: Story = {
  args: { typeName: 'ghost' },
};
