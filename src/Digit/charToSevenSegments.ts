export type SevenSegmentsValue = DigitNumber | DigitSpecial | DigitLetter;

type DigitNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type DigitSpecial = '_' | '-';
type DigitLetter =
  | 'A'
  | 'C'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'J'
  | 'L'
  | 'O'
  | 'P'
  | 'S'
  | 'U'
  | 'Y'
  | 'c'
  | 'b'
  | 'd'
  | 'h'
  | 'n'
  | 'o'
  | 'r'
  | 't'
  | 'u';

/**
 *
 *   A
 * F   B      D2      AM
 *   G
 * E   C      D1      PM
 *   D       DP
 *
 */

export const charToSevenSegments: {
  [keyName in SevenSegmentsValue]: string;
} = {
  _: 'D',
  '-': 'G',
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
  G: 'ACDEF',
  H: 'BCEFG',
  J: 'BCDE',
  L: 'DEF',
  O: 'ABCDEF',
  P: 'ABEFG',
  S: 'ACDFG',
  U: 'BCDEF',
  Y: 'BCDFG',
  c: 'DEG',
  b: 'CDEFG',
  d: 'BCDEG',
  h: 'CEFG',
  n: 'CEG',
  o: 'CDEG',
  r: 'EG',
  t: 'DEFG',
  u: 'CDE',
};
