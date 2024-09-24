import React, { CSSProperties } from 'react';
import { default as cx } from 'classnames';

import {
  charToSevenSegments,
  SevenSegmentsValue,
} from './utils/charToSevenSegments';
import './digit.css';

type DigitValue =
  | SevenSegmentsValue
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 'am'
  | 'pm'
  | ':'
  | '.';
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type DigitProps = {
  /*
   * If true, to turn all segments off
   */
  off?: boolean;
  /**
   * Shape of the segment, default is "diamond".
   * Digit' segments has shape of diamond and ampm has no background.
   */
  shape?: 'diamond' | 'rect' | 'round' | 'pill';
  /*
   * If number or character (like "L"), renders itself as 7-segment digit.
   * If ":", "." or "am"/"pm", renders itself as colon digit or dot
   */
  value: DigitValue;
};

type SegmentStyle = {
  /**
   * To override currentColor value, e.g same as passing style={{ color: ... }}
   */
  color?: CSSProperties['color'];
  /**
   * Length of a segment
   */
  length?: CSSProperties['width'];
  /**
   * Thickness of a segment
   */
  thickness?: CSSProperties['width'];
  /**
   * Spacing between segments. Might be negative.
   */
  spacing?: CSSProperties['width'];
  /**
   * Vertical shift of top (A) and bottom (D) segments
   */
  filament?: CSSProperties['width'];
  /**
   * On & off opacity of segments, defaults is 1 and 0.1
   */
  opacityOn?: CSSProperties['opacity'];
  opacityOff?: CSSProperties['opacity'];
};

export type Digit = DivProps & DigitProps & { segmentStyle?: SegmentStyle };
export const Digit = ({
  shape = 'diamond',
  segmentStyle,
  value,
  ...rest
}: Digit) => {
  const type = valueToType(value);
  const segments = valueToSegments(value); // {A: true, ...}
  const sx = {
    '--segment-color': segmentStyle?.color,
    '--segment-thickness': segmentStyle?.thickness,
    '--segment-spacing': segmentStyle?.spacing,
    '--segment-length': segmentStyle?.length,
    '--segment-filament': segmentStyle?.filament,
    '--segment-opacity-on': segmentStyle?.opacityOn,
    '--segment-opacity-off': segmentStyle?.opacityOff,
    ...rest.style,
  } as CSSProperties;

  if (type === 'digit')
    return <DigitSegments {...rest} {...segments} style={sx} shape={shape} />;
  if (type === 'colon')
    return <ColonSegments {...rest} {...segments} style={sx} shape={shape} />;
  if (type === 'ampm')
    return <AmpmSegments {...rest} {...segments} style={sx} shape={shape} />;
  if (type === 'dot')
    return <DotSegments {...rest} {...segments} style={sx} shape={shape} />;

  console.warn(`Digit.tsx: unknown value type: ${value.toString()}`);

  return <div {...rest}>{value.toString()}</div>;
};

type DigitSegments = DivProps & {
  className?: string;
  off?: DigitProps['off'];
  shape?: DigitProps['shape'];
  A?: boolean; // top
  B?: boolean;
  C?: boolean;
  D?: boolean; // bottom
  E?: boolean;
  F?: boolean;
  G?: boolean; // middle
};

const DigitSegments = ({
  className,
  off,
  shape,
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  ...rest
}: DigitSegments) => {
  const isOff = (v?: boolean) => !v || off;
  const isOn = (v?: boolean) => !!v && !off;

  return (
    <div className={cx('digit', shapeCx(shape), className)} {...rest}>
      <div className="opacity-wrapper off">
        {isOff(A) && <i className={cx('segment A horizontal')}></i>}
        {isOff(B) && <i className={cx('segment B vertical')}></i>}
        {isOff(C) && <i className={cx('segment C vertical')}></i>}
        {isOff(D) && <i className={cx('segment D horizontal')}></i>}
        {isOff(E) && <i className={cx('segment E vertical')}></i>}
        {isOff(F) && <i className={cx('segment F vertical')}></i>}
        {isOff(G) && <i className={cx('segment G horizontal')}></i>}
      </div>
      <div className="opacity-wrapper on">
        {isOn(A) && <i className={cx('segment A horizontal')}></i>}
        {isOn(B) && <i className={cx('segment B vertical')}></i>}
        {isOn(C) && <i className={cx('segment C vertical')}></i>}
        {isOn(D) && <i className={cx('segment D horizontal')}></i>}
        {isOn(E) && <i className={cx('segment E vertical')}></i>}
        {isOn(F) && <i className={cx('segment F vertical')}></i>}
        {isOn(G) && <i className={cx('segment G horizontal')}></i>}
      </div>
    </div>
  );
};

type AmpmSegments = DivProps & {
  className?: string;
  off?: DigitProps['off'];
  shape?: DigitProps['shape'];
  AM?: boolean;
  PM?: boolean;
};

const AmpmSegments = ({
  className,
  off,
  shape,
  AM,
  PM,
  ...rest
}: AmpmSegments) => {
  return (
    <div className={cx('digit ampm', shapeCx(shape), className)} {...rest}>
      <i className={cx('segment AM', onOffCx(AM, off))}></i>
      <i className={cx('segment PM', onOffCx(PM, off))}></i>
    </div>
  );
};

type ColonSegments = DivProps & {
  className?: string;
  off?: DigitProps['off'];
  shape?: DigitProps['shape'];
  D1?: boolean;
  D2?: boolean;
};

const ColonSegments = ({
  className,
  off,
  shape,
  D1,
  D2,
  ...rest
}: ColonSegments) => {
  return (
    <div className={cx('digit colon', shapeCx(shape), className)} {...rest}>
      <i className={cx('segment D1', onOffCx(D1, off))}></i>
      <i className={cx('segment D2', onOffCx(D2, off))}></i>
    </div>
  );
};

type DotSegments = DivProps & {
  className?: string;
  off?: DigitProps['off'];
  shape?: DigitProps['shape'];
  D?: boolean;
};

const DotSegments = ({ className, off, shape, D, ...rest }: DotSegments) => {
  return (
    <div className={cx('digit dot', shapeCx(shape), className)} {...rest}>
      <i className={cx('segment D', onOffCx(D, off))}></i>
    </div>
  );
};

const charSet = new Set(Object.keys(charToSevenSegments));

function valueToType(v: DigitProps['value']) {
  const val = v.toString();
  if (val === ':') return 'colon';
  if (val === '.') return 'dot';
  if (val.toLowerCase() === 'am' || val.toLowerCase() === 'pm') return 'ampm';
  if (charSet.has(val)) return 'digit';
  return undefined;
}

function valueToSegments(val: Digit['value']) {
  const s = val?.toString();

  if (s.toLowerCase() === 'am') return { AM: true };
  if (s.toLowerCase() === 'pm') return { PM: true };
  if (s === ':') return { D1: true, D2: true };
  if (s === '.') return { D: true };

  const segments = charToSevenSegments[s as SevenSegmentsValue];

  return stringToProps(segments);
}

// Convert "AB" into object {A: true, B: true}
const stringToProps = (str: string) =>
  Object.fromEntries(Array.from(str).map(char => [char, true]));

const onOffCx = (value?: boolean, off?: boolean) =>
  value && !off ? 'on' : 'off';

const shapeCx = (shape: DigitProps['shape']) => {
  if (!shape) {
    return null;
  }
  return 'shape-' + shape;
};
