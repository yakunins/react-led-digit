import React, { useState, useEffect } from 'react';
import { Digit } from '../Digit';
import { Blinker } from '../Blinker';

type BlinkingDigit = Digit & {
  blink?: {
    period?: Blinker['period'];
    ratio?: Blinker['ratio'];
  };
};

const digitBlinker = new Blinker(); // singleton makes all BlinkingDigit's to blink synchronoulsy

export const BlinkingDigit = React.memo(({ blink, ...rest }: BlinkingDigit) => {
  if (
    blink?.period === 0 ||
    blink?.ratio === 0 ||
    typeof rest?.off === 'boolean'
  )
    return <Digit {...rest} />; // no blinker required

  const [visible, setVisible] = useState(digitBlinker.visible);

  useEffect(() => {
    if (blink?.period) digitBlinker.period = blink.period;
    if (blink?.ratio) digitBlinker.ratio = blink.ratio;

    digitBlinker.subscribe(setVisible);
    return () => digitBlinker.unsubscribe(setVisible);
  }, [blink?.period, blink?.ratio]);

  return <Digit {...rest} off={rest.off || !visible} />;
});
