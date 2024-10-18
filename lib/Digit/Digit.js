"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Digit = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const charToSevenSegments_1 = require("./charToSevenSegments");
require("./digit.css");
const Digit = (_a) => {
    var { segmentStyle, value } = _a, rest = __rest(_a, ["segmentStyle", "value"]);
    const type = valueToType(value);
    const segments = type && valueToSegments(value); // {A: true, ...}
    const sx = Object.assign({ '--segment-color': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.color, '--segment-color-off': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.colorOff, '--segment-thickness': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.thickness, '--segment-spacing': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.spacing, '--segment-length': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.length, '--segment-filament': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.filament, '--segment-opacity-on': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.opacityOn, '--segment-opacity-off': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.opacityOff, '--segment-transition-duration': segmentStyle === null || segmentStyle === void 0 ? void 0 : segmentStyle.transitionDuration }, rest.style);
    if (type === 'digit')
        return (0, jsx_runtime_1.jsx)(DigitSegments, Object.assign({}, rest, segments, { style: sx }));
    if (type === 'colon')
        return (0, jsx_runtime_1.jsx)(ColonSegments, Object.assign({}, rest, segments, { style: sx }));
    if (type === 'ampm')
        return (0, jsx_runtime_1.jsx)(AmpmSegments, Object.assign({}, rest, segments, { style: sx }));
    if (type === 'dot')
        return (0, jsx_runtime_1.jsx)(DotSegments, Object.assign({}, rest, segments, { style: sx }));
    console.warn(`Digit.tsx: incompatible value: ${value.toString()}`);
    return (0, jsx_runtime_1.jsx)("div", Object.assign({}, rest, { className: (0, classnames_1.default)('digit unknown', rest.className) }));
};
exports.Digit = Digit;
const DigitSegments = (_a) => {
    var { className, off, shape = 'default', A, B, C, D, E, F, G } = _a, rest = __rest(_a, ["className", "off", "shape", "A", "B", "C", "D", "E", "F", "G"]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: (0, classnames_1.default)('digit', shapeCx(shape), className) }, rest, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "opacity-wrapper off", children: [(0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(A, off), 'segment A horizontal') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(B, off), 'segment B vertical') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(C, off), 'segment C vertical') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(D, off), 'segment D horizontal') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(E, off), 'segment E vertical') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(F, off), 'segment F vertical') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(G, off), 'segment G horizontal') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "opacity-wrapper on", children: [(0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(A, off), 'segment A horizontal') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(B, off), 'segment B vertical') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(C, off), 'segment C vertical') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(D, off), 'segment D horizontal') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(E, off), 'segment E vertical') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(F, off), 'segment F vertical') }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)(onOffCx(G, off), 'segment G horizontal') })] })] })));
};
const AmpmSegments = (_a) => {
    var { className, off, shape = 'default', AM, PM } = _a, rest = __rest(_a, ["className", "off", "shape", "AM", "PM"]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: (0, classnames_1.default)('digit ampm', shapeCx(shape), className) }, rest, { children: [(0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)('segment AM', onOffCx(AM, off)) }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)('segment PM', onOffCx(PM, off)) })] })));
};
const ColonSegments = (_a) => {
    var { className, off, shape = 'default', D1, D2 } = _a, rest = __rest(_a, ["className", "off", "shape", "D1", "D2"]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: (0, classnames_1.default)('digit colon', shapeCx(shape), className) }, rest, { children: [(0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)('segment D1', onOffCx(D1, off)) }), (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)('segment D2', onOffCx(D2, off)) })] })));
};
const DotSegments = (_a) => {
    var { className, off, shape = 'default', DP } = _a, rest = __rest(_a, ["className", "off", "shape", "DP"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, classnames_1.default)('digit dot', shapeCx(shape), className) }, rest, { children: (0, jsx_runtime_1.jsx)("i", { className: (0, classnames_1.default)('segment DP', onOffCx(DP, off)) }) })));
};
const charset = new Set(Object.keys(charToSevenSegments_1.charToSevenSegments));
function valueToType(v) {
    const str = v.toString();
    if (str === ':')
        return 'colon';
    if (str === '.')
        return 'dot';
    if (str.toLowerCase() === 'am' || str.toLowerCase() === 'pm')
        return 'ampm';
    if (charset.has(str))
        return 'digit';
    return undefined;
}
function valueToSegments(v) {
    const str = v === null || v === void 0 ? void 0 : v.toString();
    if (str.toLowerCase() === 'am')
        return { AM: true };
    if (str.toLowerCase() === 'pm')
        return { PM: true };
    if (str === ':')
        return { D1: true, D2: true };
    if (str === '.')
        return { DP: true };
    const segments = charToSevenSegments_1.charToSevenSegments[str];
    return stringToProps(segments);
}
// Convert "AB" into object {A: true, B: true}
const stringToProps = (str) => Object.fromEntries(Array.from(str).map(char => [char, true]));
const onOffCx = (value, off) => value && !off ? 'on' : 'off';
const shapeCx = (shape) => {
    if (!shape) {
        return null;
    }
    return 'shape-' + shape;
};
