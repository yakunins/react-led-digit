import { useState, useEffect } from 'react';
import { Digit } from '../Digit';
import './clock.css';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export type ClockProps = DivProps & {
  blinkingColon?: boolean;
  scale?: number;
  segmentStyle?: Digit['segmentStyle'];
  time?: Date;
};

export const Clock = ({
  scale = 1,
  time,
  segmentStyle,
  ...rest
}: ClockProps) => {
  const [date, setDate] = useState(new Date());
  const [blink, setBlink] = useState(false);
  const getDigits = () => (time ? dateToDigits(time) : dateToDigits(date));

  useEffect(() => {
    if (time) return;

    const oneSecond = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(oneSecond);
  }, []);

  return (
    <div {...rest}>
      {getDigits().map(v => {
        return (
          <Digit
            value={v}
            segmentStyle={segmentStyle}
            style={{
              fontSize: `${scale * 100}%`,
            }}
            off={blink}
          />
        );
      })}
    </div>
  );
};

function dateToDigits(d: Date): Digit['value'][] {
  const timeString = d.toLocaleTimeString();
  const parts = timeString.split();
  return ['0', '1', ':', '3', '4', 'pm'];
}

const getLocalTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getLanguage = () => {
  if (navigator?.languages != undefined) {
    return navigator?.languages[0];
  }
  return navigator?.language;
};
