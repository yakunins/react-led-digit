import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Clock } from './Clock';

const meta: Meta<typeof Clock> = {
  title: 'Example/Clock',
  component: Clock,
  parameters: {
    layout: 'centered', // https://storybook.js.org/docs/configure/story-layout
  },
  tags: ['autodocs'], // https://storybook.js.org/docs/writing-docs/autodocs
  argTypes: {
    scale: { control: 'number' },
  },
  args: { onClick: fn() }, // https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<typeof meta>;

const TestClock = () => {
  const containerStyle = {
    display: 'flex',
    gap: '.35rem',
    placeItems: 'center center',
  };

  return (
    <div style={containerStyle}>
      <Clock style={containerStyle} />
    </div>
  );
};

export const Primary: Story = {
  render: TestClock,
};
