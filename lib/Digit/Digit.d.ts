import React, { CSSProperties } from 'react';
import { SevenSegmentsValue } from './charToSevenSegments';
import './digit.css';
type NumValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitValue = NumValue | SevenSegmentsValue | 'am' | 'pm' | ':' | '.';
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type DigitProps = {
    off?: boolean;
    shape?: 'default' | 'rect' | 'round' | 'pill';
    value: DigitValue;
};
type SegmentStyle = {
    color?: CSSProperties['color'];
    colorOff?: CSSProperties['color'];
    length?: CSSProperties['width'];
    thickness?: CSSProperties['width'];
    spacing?: CSSProperties['width'];
    filament?: CSSProperties['width'];
    opacityOn?: CSSProperties['opacity'];
    opacityOff?: CSSProperties['opacity'];
    transitionDuration?: CSSProperties['transitionDuration'];
};
export type Digit = DivProps & DigitProps & {
    segmentStyle?: SegmentStyle;
};
export declare const Digit: ({ segmentStyle, value, ...rest }: Digit) => import("react/jsx-runtime").JSX.Element;
export {};
