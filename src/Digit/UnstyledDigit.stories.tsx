import type { Meta, StoryObj } from '@storybook/react';

import { UnstyledDigit } from '..';

const meta = {
  title: 'Example/UnstyledDigit',
  component: UnstyledDigit,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // https://storybook.js.org/docs/configure/story-layout
  },
  argTypes: {
    off: { control: 'boolean' },
  },
} satisfies Meta<typeof UnstyledDigit>;

export default meta;
type Story = StoryObj<typeof meta>;

const grid = {
  display: 'flex',
  gap: '.35rem',
  padding: '1rem',
  placeItems: 'center center',
};

const CustomDigit = ({ ...rest }: UnstyledDigit) => {
  return (
    <UnstyledDigit
      {...rest}
      shape="pill"
      segmentStyle={{
        thickness: '.25rem',
        length: '1.5rem',
        spacing: '0.25rem',
        shiftAD: '.0625rem',
      }}
    />
  );
};

const UnstyledDigitTest = () => {
  return (
    <>
      <div style={grid}>
        <UnstyledDigit value={0} className="test" />
        <UnstyledDigit
          value={1}
          shape="round"
          segmentStyle={{
            thickness: '.35rem',
            color: 'green',
            colorOff: 'blue',
          }}
        />
        <UnstyledDigit
          value={2}
          shape="pill"
          segmentStyle={{ thickness: '.5rem' }}
        />
        <UnstyledDigit
          value={3}
          shape="rect"
          segmentStyle={{ spacing: '.25rem' }}
        />
        <UnstyledDigit value={4} style={{ color: 'red' }} />
        <UnstyledDigit value=":" />
        <UnstyledDigit value={5} />
        <UnstyledDigit value={6} />
        <UnstyledDigit value={7} />
        <UnstyledDigit value={8} off />
        <UnstyledDigit value={9} />
        <UnstyledDigit value="." />
        <UnstyledDigit value="pm" />
      </div>
      <div style={grid}>
        <UnstyledDigit value="A" />
        <UnstyledDigit value="C" />
        <UnstyledDigit value="E" />
        <UnstyledDigit value="F" />
        <UnstyledDigit value="G" />
        <UnstyledDigit value="H" />
        <UnstyledDigit value="J" />
        <UnstyledDigit value="L" />
        <UnstyledDigit value="O" />
        <UnstyledDigit value="P" />
        <UnstyledDigit value="S" />
        <UnstyledDigit value="U" />
        <UnstyledDigit value="Y" />
      </div>
      <div style={grid}>
        <CustomDigit value={0} />
        <CustomDigit value={1} />
        <CustomDigit value=":" />
        <CustomDigit value={2} />
        <CustomDigit value={3} />
        <CustomDigit value="am" />
      </div>
      <div style={grid}>
        <CustomDigit value="A" />
        <CustomDigit value="C" />
        <CustomDigit value="E" />
        <CustomDigit value="F" />
        <CustomDigit value="H" />
        <CustomDigit value="J" />
        <CustomDigit value="L" />
        <CustomDigit value="O" />
        <CustomDigit value="P" />
        <CustomDigit value="U" />
        <CustomDigit value="Y" />
      </div>
      <div style={grid}>
        <CustomDigit value="c" />
        <CustomDigit value="b" />
        <CustomDigit value="d" />
        <CustomDigit value="h" />
        <CustomDigit value="n" />
        <CustomDigit value="o" />
        <CustomDigit value="r" />
        <CustomDigit value="u" />
      </div>
    </>
  );
};

export const UnstyledDigits: Story = {
  args: {
    value: '0',
  },
  render: UnstyledDigitTest,
};
