export type SevenSegmentsValue = DigitNumber | DigitLetter;

type DigitNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type DigitLetter =
  | 'A'
  | 'C'
  | 'E'
  | 'F'
  | 'H'
  | 'J'
  | 'L'
  | 'O'
  | 'P'
  | 'U'
  | 'Y'
  | 'c'
  | 'b'
  | 'd'
  | 'h'
  | 'n'
  | 'o'
  | 'r'
  | 'u';

/**
 *   A
 * F   B
 *   G
 * E   C
 *   D
 */

export const charToSevenSegments: {
  [keyName in SevenSegmentsValue]: string;
} = {
  '0': 'ABCDEF',
  '1': 'BC',
  '2': 'ABDEG',
  '3': 'ABCDG',
  '4': 'BCFG',
  '5': 'ACDFG',
  '6': 'ACDEFG',
  '7': 'ABC',
  '8': 'ABCDEFG',
  '9': 'ABCDFG',
  A: 'ABCEFG',
  C: 'ADEF',
  E: 'ADEFG',
  F: 'AEFG',
  H: 'BCEFG',
  J: 'BCDE',
  L: 'DEF',
  O: 'ABCDEF',
  P: 'ABEFG',
  U: 'BCDEF',
  Y: 'BCDFG',
  c: 'DEG',
  b: 'CDEFG',
  d: 'BCDEG',
  h: 'CEFG',
  n: 'CEG',
  o: 'CDEG',
  r: 'EG',
  u: 'CDE',
};
