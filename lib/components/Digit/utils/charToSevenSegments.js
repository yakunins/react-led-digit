"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.charToSevenSegments = void 0;
/**
 *
 *   A
 * F   B      D2      AM
 *   G
 * E   C      D1      PM
 *   D       DP
 *
 */
exports.charToSevenSegments = {
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
    u: 'CDE',
};
