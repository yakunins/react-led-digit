import React, { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Digit } from './Digit';
import { BlinkingDigit } from './BlinkingDigit';

const meta = {
  title: 'Example/Digit',
  component: Digit,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // https://storybook.js.org/docs/configure/story-layout
  },
  argTypes: {
    off: { control: 'boolean' },
  },
} satisfies Meta<typeof Digit>;

export default meta;
type Story = StoryObj<typeof meta>;

const StyledDigit = ({ value, ...rest }) => {
  return (
    <Digit
      {...rest}
      value={value}
      shape="pill"
      segmentStyle={{
        thickness: '.25em',
        length: '1.5em',
        spacing: '0.25em',
        filament: '.0625em',
      }}
    />
  );
};

const DigitTest = () => {
  const grid = {
    margin: '2vmin',
    display: 'flex',
    gap: '.35rem',
    placeItems: 'center center',
  };

  return (
    <>
      <style>{`.digit {outline: 0.1px solid rgba(255, 0, 0, 0.2);}`}</style>
      <div style={grid}>
        <Digit value={0} className="test" />
        <Digit
          value={1}
          shape="round"
          segmentStyle={{ thickness: '.35em' }}
          style={{ color: 'red' }}
        />
        <Digit value={2} shape="pill" segmentStyle={{ thickness: '.5em' }} />
        <Digit value={3} shape="rect" segmentStyle={{ spacing: '.25em' }} />
        <Digit value={4} />
        <Digit value=":" />
        <Digit value={5} />
        <Digit value={6} />
        <Digit value={7} />
        <Digit value={8} off />
        <Digit value={9} />
        <Digit value="pm" shape="rect" />
      </div>
      <div style={grid}>
        <Digit value="pm" />
        <Digit value=":" shape="round" />
        <Digit value="pm" shape="rect" />
        <Digit value="am" shape="round" />
        <Digit value=":" shape="pill" />
        <Digit value="pm" shape="pill" />
      </div>
      <div style={grid}>
        <Digit value="A" />
        <Digit value="C" />
        <Digit value="E" />
        <Digit value="F" />
        <Digit value="H" />
        <Digit value="J" />
        <Digit value="L" />
        <Digit value="O" />
        <Digit value="P" />
        <Digit value="U" />
        <Digit value="Y" />
        <Digit value="c" />
        <Digit value="b" />
        <Digit value="d" />
        <Digit value="h" />
        <Digit value="n" />
        <Digit value="o" />
        <Digit value="r" />
        <Digit value="u" />
      </div>
      <div style={grid}>
        <StyledDigit value={0} />
        <StyledDigit value={1} />
        <StyledDigit type="colon" value=":" />
        <StyledDigit value={2} />
        <StyledDigit value={3} />
        <StyledDigit type="ampm" value="am" />
      </div>
      <div style={grid}>
        <Digit value="E" />
        <Digit value="r" />
        <Digit value="r" />
        <Digit value="o" />
        <Digit value="r" />
        <Digit value="." />
      </div>
      <div style={grid}>
        <StyledDigit value="A" />
        <StyledDigit value="C" />
        <StyledDigit value="E" />
        <StyledDigit value="F" />
        <StyledDigit value="H" />
        <StyledDigit value="J" />
        <StyledDigit value="L" />
        <StyledDigit value="O" />
        <StyledDigit value="P" />
        <StyledDigit value="U" />
        <StyledDigit value="Y" />
        <StyledDigit value="c" />
        <StyledDigit value="b" />
        <StyledDigit value="d" />
        <StyledDigit value="h" />
        <StyledDigit value="n" />
        <StyledDigit value="o" />
        <StyledDigit value="r" />
        <StyledDigit value="u" />
      </div>
    </>
  );
};

const BlinkingDigitTest = () => {
  const grid = {
    margin: '2vmin',
    display: 'flex',
    gap: '.35rem',
    placeItems: 'center center',
  };

  const input = useRef<HTMLInputElement>(null);
  const [digits, setDigits] = useState('');
  const addDigit = () => {
    const char = input.current?.value;
    if (char) setDigits(digits + char);
  };
  const removeDigit = idx => {
    let next = setCharAt(digits, idx, '');
    setDigits(next);
  };

  return (
    <>
      <style>{`.digit {outline: 0.1px solid rgba(255, 0, 0, 0.2);}`}</style>
      <div style={grid}>
        <BlinkingDigit value=":" />
        {digits.split('').map((char, idx) => (
          <BlinkingDigit
            key={idx}
            value={char as Digit['value']}
            onClick={() => removeDigit(idx)}
          />
        ))}
      </div>
      <button onClick={addDigit}>Add digit</button>
      <input ref={input} placeholder="digit value" maxLength={1} />
    </>
  );
};

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

export const Pimary: Story = {
  args: {
    value: '0',
  },
  render: DigitTest,
};

export const Blinking: Story = {
  args: {
    value: '0',
  },
  render: BlinkingDigitTest,
};
