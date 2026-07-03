import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { PokemonCard } from './pokemon-card';

const meta = {
  component: PokemonCard,
  argTypes: {
    onPress: { action: 'pressed' },
  },
  parameters: { chromatic: { delay: 500 } },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 250, height: 250 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PokemonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pikachu: Story = {
  name: 'PikachuCard',
  args: {
    id: 25,
    name: 'pikachu',
    onPress: () => {},
  },
};

export const Bulbasaur: Story = {
  args: {
    id: 1,
    name: 'bulbasaur',
    onPress: () => {},
  },
};

export const Charizard: Story = {
  args: {
    id: 6,
    name: 'charizard',
    onPress: () => {},
  },
};
