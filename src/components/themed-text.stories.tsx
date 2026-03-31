import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { ThemedText } from './themed-text';

const meta = {
  component: ThemedText,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ThemedText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default text style',
  },
};

export const Title: Story = {
  args: {
    type: 'title',
    children: 'Title',
  },
};

export const Subtitle: Story = {
  args: {
    type: 'subtitle',
    children: 'Subtitle text',
  },
};

export const Small: Story = {
  args: {
    type: 'small',
    children: 'Small text style',
  },
};

export const SmallBold: Story = {
  args: {
    type: 'smallBold',
    children: 'Small bold text',
  },
};

export const Code: Story = {
  args: {
    type: 'code',
    children: 'const x = 42;',
  },
};

export const LinkPrimary: Story = {
  args: {
    type: 'linkPrimary',
    children: 'Primary link text',
  },
};

export const SecondaryColor: Story = {
  args: {
    children: 'Secondary colored text',
    themeColor: 'textSecondary',
  },
};
