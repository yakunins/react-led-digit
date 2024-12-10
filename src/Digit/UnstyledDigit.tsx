import React, { CSSProperties } from 'react';
import { default as cx } from 'clsx';

import { charToSevenSegments, SevenSegmentsValue } from './charToSevenSegments';
import {
  DigitSegments,
  ColonSegments,
  AmpmSegments,
  DotSegments,
} from './components';

type NumValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitValue = NumValue | SevenSegmentsValue | 'am' | 'pm' | ':' | '.';
type DivProps = React.HTMLAttributes<HTMLDivElement>;
export type DigitProps = {
  /*
   * If true, all segments turn off having 'opacityOff' and
   */
  off?: boolean;
  /*
   * Shape of the segment. Default is "default", meaning...
   * For 7-segment digit default shape is diamond.
   * For colon and dot default shape is circle.
   * For ampm default shape is letters with no background, otherwise filled.
   */
  shape?: 'default' | 'rect' | 'round' | 'pill';
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
   * Spacing between segments, may be negative
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
  /*
   * Segment's color and opacity transition duration, default is .25s
   */
  transitionDuration?: CSSProperties['transitionDuration'];
  /*
   * Change outer corners of a diamond-shaped digit
   */
  cornerShift?: CSSProperties['width'];
};

export type Digit = DivProps & DigitProps & { segmentStyle?: SegmentStyle };

export const Digit = ({ segmentStyle, value, ...rest }: Digit) => {
  const v = value.toString();
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
    '--segment-transition-duration': segmentStyle?.transitionDuration,
    '--segment-corner-shift': segmentStyle?.cornerShift,
    ...rest.style,
  } as CSSProperties;

  if (type === 'digit')
    return <DigitSegments aria-label={v} {...rest} {...segments} style={sx} />;
  if (type === 'colon')
    return <ColonSegments aria-label={v} {...rest} {...segments} style={sx} />;
  if (type === 'ampm')
    return <AmpmSegments aria-label={v} {...rest} {...segments} style={sx} />;
  if (type === 'dot')
    return <DotSegments aria-label={v} {...rest} {...segments} style={sx} />;

  console.warn(`(at Digit.tsx) incompatible value: ${value.toString()}`);
  return (
    <div
      aria-label={v}
      {...rest}
      className={cx('digit unknown', rest.className)}
    ></div>
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
