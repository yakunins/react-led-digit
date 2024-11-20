import React, { useState, useEffect } from 'react';
import { default as cx } from 'classnames';

import { Digit } from '../Digit';
import { Blinker } from '../Blinker';

type BlinkingDigit = Digit & {
  blinkOptions?: {
    period?: Blinker['period'];
    ratio?: Blinker['ratio'];
  };
};

const blinker = new Blinker(); // singleton makes all BlinkingDigit's to blink synchronoulsy

export const BlinkingDigit = React.memo(
  ({ blinkOptions, className, ...rest }: BlinkingDigit) => {
    const [visible, setVisible] = useState(blinker.visible);

    useEffect(() => {
      if (blinkOptions?.period) blinker.period = blinkOptions.period;
      if (blinkOptions?.ratio) blinker.ratio = blinkOptions.ratio;

      blinker.subscribe(setVisible);
      return () => blinker.unsubscribe(setVisible);
    }, [blinkOptions?.period, blinkOptions?.ratio]);

    if (
      blinkOptions?.period === 0 ||
      blinkOptions?.ratio === 0 ||
      typeof rest?.off === 'boolean'
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
