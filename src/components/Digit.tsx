import React, { CSSProperties } from 'react';
import { default as cx } from 'classnames';
import './digit.css';

type NumericDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type DigitStyle = {
  digit?: 'rect' | 'round';
  colon?: 'round';
  ampm?: 'inverted';
};
type DigitType =
  | {
      type?: 'digit';
      value?: NumericDigit | StringDigit;
    }
  | {
      type: 'colon';
      value?: ':';
    }
  | {
      type: 'ampm';
      value?: 'AM' | 'PM' | 'am' | 'pm';
    };

export type DigitProps = DigitType & {
  /**
   * Length of a segment
   */
  length?: CSSProperties['width'];
  /**
   * Thickness of a segment
   */
  thickness?: CSSProperties['width'];
  /**
   * Spacing between segments
   */
  spacing?: CSSProperties['width'];
  /**
   * Opacity of a segment
   */
  opacity?: {
    on: number;
    off: number;
  };
  style?: DigitStyle;
};

function valueToSegments(val: DigitProps['value']) {
  const toObj = (str: string) =>
    Object.fromEntries(Array.from(str.toUpperCase()).map(c => [c, true]));
  const s = val?.toString().toUpperCase();

  if (s === '0') return toObj('ABCDEF');
  if (s === '1') return toObj('BC');
  if (s === '2') return toObj('ABDEG');
  if (s === '3') return toObj('ABCDG');
  if (s === '4') return toObj('BCFG');
  if (s === '5') return toObj('ACDFG');
  if (s === '6') return toObj('ACDEFG');
  if (s === '7') return toObj('ABC');
  if (s === '8') return toObj('ABCDEFG');
  if (s === '9') return toObj('ABCDFG');
  if (s === 'AM') return { AM: true };
  if (s === 'PM') return { PM: true };
  if (s === ':') return { D1: true, D2: true };
}
const on = (arg?: boolean) => (arg ? 'on' : 'off');

export const Digit = ({
  type = 'digit',
  style,
  value,
  length = '1vmin',
  thickness = '.3vmin',
  spacing = '.1vmin',
  opacity = {
    off: 0.1,
    on: 1,
  },
  ...rest
}: DigitProps) => {
  const segmentsObj = valueToSegments(value);

  if (type === 'digit')
    return <DigitSegments {...segmentsObj} {...rest} style={style?.digit} />;
  if (type === 'colon')
    return <ColonSegments {...segmentsObj} {...rest} style={style?.colon} />;
  if (type === 'ampm')
    return <AmpmSegments {...segmentsObj} {...rest} style={style?.ampm} />;
};

interface DigitSegmentsProps {
  className?: string;
  style?: DigitStyle['digit'];
  A?: boolean; // top
  B?: boolean;
  C?: boolean;
  D?: boolean; // bottom
  E?: boolean;
  F?: boolean;
  G?: boolean; // middle
}

const DigitSegments = ({
  className,
  style,
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  ...rest
}: DigitSegmentsProps) => {
  return (
    <div className={cx('digit', className)} {...rest}>
      <i className={cx('segment A horizontal', style, on(A))}></i>
      <i className={cx('segment B vertical', style, on(B))}></i>
      <i className={cx('segment C vertical', style, on(C))}></i>
      <i className={cx('segment D horizontal', style, on(D))}></i>
      <i className={cx('segment E vertical', style, on(E))}></i>
      <i className={cx('segment F vertical', style, on(F))}></i>
      <i className={cx('segment G horizontal', style, on(G))}></i>
    </div>
  );
};

interface ColonSegmentsProps {
  className?: string;
  style?: DigitStyle['colon'];
  D1?: boolean;
  D2?: boolean;
}

const ColonSegments = ({
  className,
  style,
  D1,
  D2,
  ...rest
}: ColonSegmentsProps) => {
  return (
    <div className={cx('digit colon', className)} {...rest}>
      <i className={cx('segment dot d1', style, on(D1))}></i>
      <i className={cx('segment dot d2', style, on(D2))}></i>
    </div>
  );
};

interface AmpmSegmentsProps {
  className?: string;
  style?: DigitStyle['ampm'];
  AM?: boolean;
  PM?: boolean;
}

const AmpmSegments = ({
  className,
  style,
  AM,
  PM,
  ...rest
}: AmpmSegmentsProps) => {
  return (
    <div className={cx('digit ampm', className)} {...rest}>
      <i className={cx('segment am', style, on(AM))}></i>
      <i className={cx('segment pm', style, on(PM))}></i>
    </div>
  );
};
