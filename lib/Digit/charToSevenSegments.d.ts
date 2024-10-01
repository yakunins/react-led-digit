export type SevenSegmentsValue = DigitNumber | DigitSpecial | DigitLetter;
type DigitNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type DigitSpecial = '_' | '-';
type DigitLetter = 'A' | 'C' | 'E' | 'F' | 'H' | 'J' | 'L' | 'O' | 'P' | 'S' | 'U' | 'Y' | 'c' | 'b' | 'd' | 'h' | 'n' | 'o' | 'r' | 'u';
/**
 *
 *   A
 * F   B      D2      AM
 *   G
 * E   C      D1      PM
 *   D       DP
 *
 */
export declare const charToSevenSegments: {
    [keyName in SevenSegmentsValue]: string;
};
export {};
