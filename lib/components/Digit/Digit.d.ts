import React, { CSSProperties } from 'react';
import { SevenSegmentsValue } from './utils/charToSevenSegments';
import './digit.css';
type NumValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitValue = NumValue | SevenSegmentsValue | 'am' | 'pm' | ':' | '.';
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type DigitProps = {
    off?: boolean;
    shape?: 'arduino' | 'diamond' | 'rect' | 'round' | 'pill';
    value: DigitValue;
};
type SegmentStyle = {
    color?: CSSProperties['color'];
    length?: CSSProperties['width'];
    thickness?: CSSProperties['width'];
    spacing?: CSSProperties['width'];
    filament?: CSSProperties['width'];
    opacityOn?: CSSProperties['opacity'];
    opacityOff?: CSSProperties['opacity'];
};
export type Digit = DivProps & DigitProps & {
    segmentStyle?: SegmentStyle;
};
export declare const Digit: ({ segmentStyle, value, ...rest }: Digit) => import("react/jsx-runtime").JSX.Element;
export {};
