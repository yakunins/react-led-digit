import React, { useState, useEffect } from 'react';
import { default as cx } from 'clsx';

import { Digit } from '../Digit';
import { Blinker } from '../Blinker';

type BlinkingDigit = Digit & {
  blinkOptions?: {
    period?: Blinker['period'];
    ratio?: Blinker['ratio'];
    sync?: boolean;
  };
};

export const BlinkingDigit = React.memo(
  ({ blinkOptions, className, ...rest }: BlinkingDigit) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const blinker = new Blinker({
        ...blinkOptions,
        singleton: blinkOptions?.sync,
      }); // singleton makes all instances BlinkingDigit to blink in sync

      if (blinkOptions?.period) blinker.period = blinkOptions.period;
      if (blinkOptions?.ratio) blinker.ratio = blinkOptions.ratio;

      blinker.subscribe(setVisible);
      return () => blinker.unsubscribe(setVisible);
    }, [blinkOptions?.period, blinkOptions?.ratio, blinkOptions?.sync]);

    if (
      blinkOptions?.period === 0 ||
      blinkOptions?.ratio === 0 ||
      typeof rest.off === 'boolean'
    )
      return <Digit {...rest} className={cx('blinking', className)} />; // no blinker required

    return (
      <Digit
        {...rest}
        className={cx('blinking', className)}
        off={rest.off || !visible}
      />
    );
  }
);
