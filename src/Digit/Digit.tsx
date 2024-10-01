import React, { CSSProperties } from 'react';
import { default as cx } from 'classnames';

import { charToSevenSegments, SevenSegmentsValue } from './charToSevenSegments';
import './digit.css';

type NumValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitValue = NumValue | SevenSegmentsValue | 'am' | 'pm' | ':' | '.';
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type DigitProps = {
  /*
   * If true, all segments turn off having 'opacityOff' and
   */
  off?: boolean;
  /*
   * Shape of the segment. Default is "undefined", meaning...
   * For 7-segment digit default shape is diamond.
   * For colon and dot values default shape is circle.
   * For am-pm value default is letters with no background.
   */
  shape?: 'arduino' | 'diamond' | 'rect' | 'round' | 'pill';
  /*
   * If number or character (like "L"), renders itself as 7-segment digit.
   * If ":", "." or "am"/"pm", renders itself as colon digit or dot
   */
  value: DigitValue;
};

type SegmentStyle = {
  /*
   * Override currentColor, e.g works same way as style={{ color: ... }}
   */
  color?: CSSProperties['color'];
  /*
   * Override currentColor for segments that turned off
   */
  colorOff?: CSSProperties['color'];
  /*
   * Length of a segment
   */
  length?: CSSProperties['width'];
  /*
   * Thickness of a segment
   */
  thickness?: CSSProperties['width'];
  /*
   * Spacing between segments. Might be negative.
   */
  spacing?: CSSProperties['width'];
  /*
   * Vertical shift of top (A) and bottom (D) segments
   */
  filament?: CSSProperties['width'];
  /*
   * On & off opacity of segments, defaults is 1 and 0.1
   */
  opacityOn?: CSSProperties['opacity'];
  opacityOff?: CSSProperties['opacity'];
  opacityDuration?: CSSProperties['transitionDuration'];
};

export type Digit = DivProps & DigitProps & { segmentStyle?: SegmentStyle };
export const Digit = ({ segmentStyle, value, ...rest }: Digit) => {
  const type = valueToType(value);
  const segments = type && valueToSegments(value); // {A: true, ...}

  const sx = {
    '--segment-color': segmentStyle?.color,
    '--segment-color-off': segmentStyle?.colorOff,
    '--segment-thickness': segmentStyle?.thickness,
    '--segment-spacing': segmentStyle?.spacing,
    '--segment-length': segmentStyle?.length,
    '--segment-filament': segmentStyle?.filament,
    '--segment-opacity-on': segmentStyle?.opacityOn,
    '--segment-opacity-off': segmentStyle?.opacityOff,
    '--segment-opacity-duration': segmentStyle?.opacityDuration,
    ...rest.style,
  } as CSSProperties;

  if (type === 'digit')
    return <DigitSegments {...rest} {...segments} style={sx} />;
  if (type === 'colon')
    return <ColonSegments {...rest} {...segments} style={sx} />;
  if (type === 'ampm')
    return <AmpmSegments {...rest} {...segments} style={sx} />;
  if (type === 'dot') return <DotSegments {...rest} {...segments} style={sx} />;

  console.warn(`Digit.tsx: incompatible value: ${value.toString()}`);
  return <div {...rest} className={cx('digit unknown', rest.className)}></div>;
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
  return (
    <div className={cx('digit', shapeCx(shape), className)} {...rest}>
      <div className="opacity-wrapper off">
        <i className={cx(onOffCx(A, off), 'segment A horizontal')}></i>
        <i className={cx(onOffCx(B, off), 'segment B vertical')}></i>
        <i className={cx(onOffCx(C, off), 'segment C vertical')}></i>
        <i className={cx(onOffCx(D, off), 'segment D horizontal')}></i>
        <i className={cx(onOffCx(E, off), 'segment E vertical')}></i>
        <i className={cx(onOffCx(F, off), 'segment F vertical')}></i>
        <i className={cx(onOffCx(G, off), 'segment G horizontal')}></i>
      </div>
      <div className="opacity-wrapper on">
        <i className={cx(onOffCx(A, off), 'segment A horizontal')}></i>
        <i className={cx(onOffCx(B, off), 'segment B vertical')}></i>
        <i className={cx(onOffCx(C, off), 'segment C vertical')}></i>
        <i className={cx(onOffCx(D, off), 'segment D horizontal')}></i>
        <i className={cx(onOffCx(E, off), 'segment E vertical')}></i>
        <i className={cx(onOffCx(F, off), 'segment F vertical')}></i>
        <i className={cx(onOffCx(G, off), 'segment G horizontal')}></i>
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
  shape = 'pill',
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
  DP?: boolean;
};

const DotSegments = ({
  className,
  off,
  shape = 'pill',
  DP,
  ...rest
}: DotSegments) => {
  return (
    <div className={cx('digit dot', shapeCx(shape), className)} {...rest}>
      <i className={cx('segment DP', onOffCx(DP, off))}></i>
    </div>
  );
};

const charset = new Set(Object.keys(charToSevenSegments));

function valueToType(v: DigitProps['value']) {
  const str = v.toString();
  if (str === ':') return 'colon';
  if (str === '.') return 'dot';
  if (str.toLowerCase() === 'am' || str.toLowerCase() === 'pm') return 'ampm';
  if (charset.has(str)) return 'digit';
  return undefined;
}

function valueToSegments(v: Digit['value']) {
  const str = v?.toString();

  if (str.toLowerCase() === 'am') return { AM: true };
  if (str.toLowerCase() === 'pm') return { PM: true };
  if (str === ':') return { D1: true, D2: true };
  if (str === '.') return { DP: true };

  const segments = charToSevenSegments[str as SevenSegmentsValue];
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
