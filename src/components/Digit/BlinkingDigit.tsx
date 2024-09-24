import React, { useState, useEffect } from 'react';
import { Digit } from './Digit';
import { blinkSingleton } from './utils';

const blinker = blinkSingleton();
blinker.start();

export const BlinkingDigit = ({
  blink = true,
  ...rest
}: Digit & { blink?: boolean }) => {
  const [off, setOff] = useState(false);

  const handleBlink = state => {
    if (state === 'on') setOff(false);
    if (state === 'off') setOff(true);
  };

  useEffect(() => {
    blinker.subscribe(handleBlink);
    return () => blinker.unsubscribe(handleBlink);
  }, []);

  return <Digit off={off} {...rest} />;
};
