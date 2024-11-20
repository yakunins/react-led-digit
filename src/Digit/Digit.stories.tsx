import React, { useEffect, useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Digit } from './Digit';
import { BlinkingDigit } from '../';
import { charToSevenSegments } from './';

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
        thickness: '.25rem',
        length: '1.5rem',
        spacing: '0.25rem',
        filament: '.0625rem',
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
          segmentStyle={{
            thickness: '.35rem',
            color: 'green',
            colorOff: 'blue',
          }}
        />
        <Digit value={2} shape="pill" segmentStyle={{ thickness: '.5rem' }} />
        <Digit value={3} shape="rect" segmentStyle={{ spacing: '.25rem' }} />
        <Digit value={4} style={{ color: 'red' }} />
        <Digit value=":" />
        <Digit value={5} />
        <Digit value={6} />
        <Digit value={7} />
        <Digit value={8} off />
        <Digit value={9} />
        <Digit value="." />
        <Digit value="pm" />
      </div>
      <div style={grid}>
        <BlinkingDigit value="pm" blinkOptions={{ period: 2000 }} />
        <BlinkingDigit value=":" shape="round" />
        <BlinkingDigit value="pm" shape="rect" />
        <BlinkingDigit value="am" shape="round" />
        <BlinkingDigit value=":" shape="pill" />
        <BlinkingDigit value="pm" shape="pill" />
        <BlinkingDigit value="-" shape="pill" />
        <BlinkingDigit value="_" shape="pill" />
        <BlinkingDigit
          value={2}
          shape="pill"
          segmentStyle={{ thickness: '.5rem' }}
        />
        <BlinkingDigit
          value=":"
          shape="pill"
          segmentStyle={{ thickness: '1rem' }}
        />
      </div>
      <div style={grid}>
        <Digit value="A" />
        <Digit value="C" />
        <Digit value="E" />
        <Digit value="F" />
        <Digit value="G" />
        <Digit value="H" />
        <Digit value="J" />
        <Digit value="L" />
        <Digit value="O" />
        <Digit value="P" />
        <Digit value="S" />
        <Digit value="U" />
        <Digit value="Y" />
      </div>
      <div style={grid}>
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
      </div>
      <div style={grid}>
        <StyledDigit value="c" />
        <StyledDigit value="b" />
        <StyledDigit value="d" />
        <StyledDigit value="h" />
        <StyledDigit value="n" />
        <StyledDigit value="o" />
        <StyledDigit value="r" />
        <StyledDigit value="u" />
        <BlinkingDigit
          value="2"
          shape="round"
          segmentStyle={{
            color: 'green',
            colorOff: 'red',
            length: '1.5rem',
            spacing: '-0.025rem',
            thickness: '0.5rem',
            opacityOff: 0.2,
          }}
        />
      </div>
    </>
  );
};

const gridStyle = {
  margin: '2vmin',
  display: 'flex',
  gap: '.35rem',
  placeItems: 'center center',
};

const charset = new Set(Object.keys(charToSevenSegments));
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

const BlinkingDigitTest = () => {
  const input = useRef<HTMLInputElement>(null);
  const [dgts, setDgts] = useState('');

  const addDigit = () => {
    if (input.current!.value) {
      setDgts(prev => prev + input.current!.value);
    }
  };

  const removeDigit = idx => {
    const next = setCharAt(dgts, idx, '');
    setDgts(next);
  };

  const handleChange = () => {
    if (!charset.has(input.current!.value)) {
      input.current!.value = '';
    }
  };

  const handleInputKeypress = e => {
    if (e.key === 'Enter') {
      addDigit();
    }
  };

  useEffect(() => {
    input.current?.addEventListener('keydown', handleInputKeypress);
    return () => {
      input.current?.removeEventListener('keydown', handleInputKeypress);
    };
  }, []);

  return (
    <>
      <style>{`.digit {outline: 0.1px solid rgba(255, 0, 0, 0.2);}`}</style>
      <style>{`input { border: 1px solid black; border-radius: .5rem; padding: .5rem .25rem;}`}</style>
      <style>{`button { border: none; border-radius: .5rem; padding: .5rem 1rem;}`}</style>
      <style>{`button, input, p { font-size: 100%; font-family: sans-serif; margin: .25rem;}`}</style>
      <p>charset: {Array.from(charset).join(', ')}</p>
      <input
        type="text"
        placeholder="digit"
        ref={input}
        onChange={handleChange}
        maxLength={1}
      />
      <button onClick={addDigit}>Add digit</button>
      <div style={gridStyle}>
        <Digit value="b" />
        <BlinkingDigit value=":" />
        {dgts.split('').map((char, idx) => (
          <BlinkingDigit
            key={idx}
            value={char as Digit['value']}
            onClick={() => removeDigit(idx)}
            blinkOptions={{
              period: 2000,
              ratio: 3,
            }}
            segmentStyle={{
              transitionDuration: '0.5s',
            }}
          />
        ))}
      </div>
    </>
  );
};

export type DisplayProps = React.HTMLAttributes<HTMLDivElement> & {
  scale?: number;
  segmentStyle?: Digit['segmentStyle'];
  value: string;
};

const getDigits = (str: string): Digit['value'][] => {
  let s = str.trim().toLowerCase();
  const am = s.includes('am');
  const pm = s.includes('pm');
  s = s.replace('am', '').replace('pm', '').replace(' ', '');
  const result = s.split('') as Digit['value'][];
  if (am) result.push('am');
  if (pm) result.push('pm');
  return result;
};

const Display = React.memo(({ scale = 1, value, ...rest }: DisplayProps) => {
  const digits = getDigits(value);
  return (
    <div {...rest}>
      {digits.map((digit, idx) => {
        const d = digit.toString();
        return (
          <BlinkingDigit
            key={idx}
            value={digit}
            off={':.-'.includes(d) ? undefined : false}
            style={{
              fontSize: `${scale * 100}%`,
            }}
            segmentStyle={{
              color: 'green',
            }}
          />
        );
      })}
    </div>
  );
});

const getTime = () => new Date().toLocaleTimeString();

const SimpleClock = () => {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const i = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(i);
  }, []);

  return <Display style={gridStyle} value={time} />;
};

export const Clock: Story = {
  args: {
    value: '0',
  },
  render: SimpleClock,
};

export const Digits: Story = {
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
