import { CSSProperties } from 'react';
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
export type DigitBaseProps = {
  /**
   * When `true`, all segments are dimmed to `opacityOff` (default 0.1),
   * simulating a powered-off LED display.
   */
  off?: boolean;
  /**
   * Controls the visual shape of each segment.
   * - `"default"` — diamond for digits, circle for colon/dot, plain text for am/pm
   * - `"rect"` — rectangular segments with sharp corners
   * - `"round"` — segments with fully rounded ends
   * - `"pill"` — capsule-shaped segments (rounded rectangle)
   * - `"calculator"` — angled segments resembling a classic LCD calculator
   */
  shape?: 'default' | 'rect' | 'round' | 'pill' | 'calculator';
  /**
   * The character to display.
   * - `0`–`9` or a supported letter (e.g. `"L"`, `"H"`) — renders as a 7-segment digit
   * - `":"` — renders as a colon (two vertically stacked dots)
   * - `"."` — renders as a single decimal dot
   * - `"am"` / `"pm"` — renders as an AM/PM indicator
   * - A `SevenSegmentsValue` string — directly specifies which segments to light up
   */
  value: DigitValue;
};

type SegmentStyle = {
  /**
   * Color of active (lit) segments. Overrides the inherited `currentColor`.
   * Accepts any CSS color value (e.g. `"#ff0000"`, `"red"`, `"rgb(0,255,0)"`).
   */
  color?: CSSProperties['color'];
  /**
   * Color of inactive (unlit) segments. Useful for showing a faint "ghost"
   * outline of the full display. Defaults to the same as `color` at reduced opacity.
   */
  colorOff?: CSSProperties['color'];
  /**
   * Length of each segment (the longer dimension).
   * Accepts any CSS length value (e.g. `"20px"`, `"1.5em"`).
   */
  length?: CSSProperties['width'];
  /**
   * Thickness of each segment (the shorter dimension).
   * Accepts any CSS length value (e.g. `"4px"`, `"0.3em"`).
   */
  thickness?: CSSProperties['width'];
  /**
   * Gap between adjacent segments. Can be negative to overlap segments.
   * Accepts any CSS length value (e.g. `"1px"`, `"-0.5px"`).
   */
  spacing?: CSSProperties['width'];
  /**
   * Vertical offset applied to the top (A) and bottom (D) horizontal segments,
   * pushing them closer together or farther apart. Useful for fine-tuning
   * the digit's aspect ratio.
   */
  shiftAD?: CSSProperties['width'];
  /**
   * Opacity of active (lit) segments. Defaults to `1`.
   */
  opacityOn?: CSSProperties['opacity'];
  /**
   * Opacity of inactive (unlit) segments. Defaults to `0.1`.
   */
  opacityOff?: CSSProperties['opacity'];
  /**
   * CSS transition duration for segment color and opacity changes.
   * Defaults to `".25s"`. Set to `"0s"` for instant switching.
   */
  transitionDuration?: CSSProperties['transitionDuration'];
  /**
   * Size of the corner cutoff. Don't applies when `shape` is `"calculator"`.
   */
  cornerCutoff?: CSSProperties['width'];
};

export type DigitProps = DivProps &
  DigitBaseProps & { segmentStyle?: SegmentStyle };

export const Digit = ({ segmentStyle, value, ...rest }: DigitProps) => {
  const v = value.toString();
  const type = valueToType(value);
  const segments = type && valueToSegments(value); // {A: true, ...}

  const sx = {
    '--segment-color': segmentStyle?.color,
    '--segment-color-off': segmentStyle?.colorOff,
    '--segment-thickness': segmentStyle?.thickness,
    '--segment-spacing': segmentStyle?.spacing,
    '--segment-length': segmentStyle?.length,
    '--segment-shift-ad': segmentStyle?.shiftAD,
    '--segment-opacity-on': segmentStyle?.opacityOn,
    '--segment-opacity-off': segmentStyle?.opacityOff,
    '--segment-transition-duration': segmentStyle?.transitionDuration,
    '--segment-corner-cutoff': segmentStyle?.cornerCutoff,
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

  console.warn(
    `(at UnstyledDigit.tsx) incompatible value: ${value.toString()}`
  );
  return (
    <div
      aria-label={v}
      {...rest}
      className={cx('digit unknown', rest.className)}
    ></div>
  );
};

const charset = new Set(Object.keys(charToSevenSegments));

function valueToType(v: DigitBaseProps['value']) {
  const str = v.toString();
  if (str === ':') return 'colon';
  if (str === '.') return 'dot';
  if (str.toLowerCase() === 'am' || str.toLowerCase() === 'pm') return 'ampm';
  if (charset.has(str)) return 'digit';
  return undefined;
}

function valueToSegments(v: DigitProps['value']) {
  const str = v?.toString() ?? '';

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
