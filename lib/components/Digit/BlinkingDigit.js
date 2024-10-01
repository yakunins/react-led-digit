"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlinkingDigit = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const Digit_1 = require("./Digit");
const utils_1 = require("./utils");
const digitBlinker = new utils_1.Blinker(); // all BlinkingDigit's to blink in sync
exports.BlinkingDigit = react_1.default.memo((_a) => {
    var { blink } = _a, rest = __rest(_a, ["blink"]);
    if ((blink === null || blink === void 0 ? void 0 : blink.period) === 0 ||
        (blink === null || blink === void 0 ? void 0 : blink.ratio) === 0 ||
        typeof (rest === null || rest === void 0 ? void 0 : rest.off) === 'boolean')
        return (0, jsx_runtime_1.jsx)(Digit_1.Digit, Object.assign({}, rest)); // no blinker required
    const [visible, setVisible] = (0, react_1.useState)(digitBlinker.visible);
    (0, react_1.useEffect)(() => {
        if (blink === null || blink === void 0 ? void 0 : blink.period)
            digitBlinker.period = blink.period;
        if (blink === null || blink === void 0 ? void 0 : blink.ratio)
            digitBlinker.ratio = blink.ratio;
        digitBlinker.subscribe(setVisible);
        return () => digitBlinker.unsubscribe(setVisible);
    }, [blink === null || blink === void 0 ? void 0 : blink.period, blink === null || blink === void 0 ? void 0 : blink.ratio]);
    return (0, jsx_runtime_1.jsx)(Digit_1.Digit, Object.assign({}, rest, { off: rest.off || !visible }));
});
