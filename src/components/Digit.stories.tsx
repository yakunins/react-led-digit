import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Digit } from './Digit';

const meta = {
  title: 'Example/Digit',
  component: Digit,
  tags: ['autodocs'], // https://storybook.js.org/docs/writing-docs/autodocs
  parameters: {
    layout: 'fullscreen', // https://storybook.js.org/docs/configure/story-layout
  },
  args: {},
} satisfies Meta<typeof Digit>;

export default meta;
type Story = StoryObj<typeof meta>;

const margin = {
  margin: '2vmin',
  display: 'flex',
  gap: '.5rem',
};

const WithMargin = () => {
  return (
    <div style={margin}>
      <Digit value={0} />
      <Digit value={1} />
      <Digit value={2} />
      <Digit value={3} />
      <Digit value={4} style={{ digit: 'rect' }} />
      <Digit type="colon" value=":" />
      <Digit value={5} />
      <Digit value={6} />
      <Digit value={7} />
      <Digit value={8} />
      <Digit value={9} style={{ digit: 'round' }} />
      <Digit type="ampm" value="am" />
      <Digit type="colon" value=":" style={{ colon: 'round' }} />
      <Digit type="ampm" value="PM" />
    </div>
  );
};
export const Primary: Story = {
  render: () => <WithMargin />,
};
