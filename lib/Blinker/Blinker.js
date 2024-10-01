"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Blinker_instances, _Blinker_initOptions, _Blinker_state, _Blinker_on, _Blinker_off;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blinker = void 0;
const defaultOptions = {
    autoRun: true,
    period: 1000,
    ratio: 1,
    visible: true,
};
class Blinker {
    constructor(options = defaultOptions) {
        _Blinker_instances.add(this);
        _Blinker_initOptions.set(this, defaultOptions); // store options
        _Blinker_state.set(this, {
            timeout: null,
            subscribers: [],
            period: defaultOptions.period,
            ratio: defaultOptions.ratio,
            visible: defaultOptions.visible,
            blinks: 0,
        });
        if (!Blinker.instance) {
            Blinker.instance = this;
            __classPrivateFieldSet(this, _Blinker_initOptions, Object.assign(Object.assign({}, defaultOptions), options), "f");
            __classPrivateFieldGet(this, _Blinker_state, "f").period = __classPrivateFieldGet(this, _Blinker_initOptions, "f").period;
            __classPrivateFieldGet(this, _Blinker_state, "f").ratio = __classPrivateFieldGet(this, _Blinker_initOptions, "f").ratio;
            __classPrivateFieldGet(this, _Blinker_state, "f").visible = __classPrivateFieldGet(this, _Blinker_initOptions, "f").visible;
            if (__classPrivateFieldGet(this, _Blinker_initOptions, "f").autoRun)
                this.start();
        }
        return Blinker.instance;
    }
    get period() {
        return __classPrivateFieldGet(this, _Blinker_state, "f").period;
    }
    get ratio() {
        return __classPrivateFieldGet(this, _Blinker_state, "f").ratio;
    }
    get visible() {
        return __classPrivateFieldGet(this, _Blinker_state, "f").visible;
    }
    set period(val) {
        if (val !== __classPrivateFieldGet(this, _Blinker_state, "f").period && val !== 0) {
            __classPrivateFieldGet(this, _Blinker_state, "f").period = Math.abs(val);
            this.start();
        }
    }
    set ratio(val) {
        if (val !== __classPrivateFieldGet(this, _Blinker_state, "f").ratio && val !== 0) {
            __classPrivateFieldGet(this, _Blinker_state, "f").ratio = Math.abs(val);
            this.start();
        }
    }
    set visible(val) {
        if (val !== __classPrivateFieldGet(this, _Blinker_state, "f").visible) {
            __classPrivateFieldGet(this, _Blinker_state, "f").visible = val;
            this.start();
        }
    }
    start(visible = __classPrivateFieldGet(this, _Blinker_state, "f").visible) {
        if (__classPrivateFieldGet(this, _Blinker_state, "f").timeout)
            this.stop();
        visible ? __classPrivateFieldGet(this, _Blinker_instances, "m", _Blinker_on).call(this) : __classPrivateFieldGet(this, _Blinker_instances, "m", _Blinker_off).call(this); // start blinking
    }
    stop() {
        __classPrivateFieldGet(this, _Blinker_state, "f").timeout && clearTimeout(__classPrivateFieldGet(this, _Blinker_state, "f").timeout);
        __classPrivateFieldGet(this, _Blinker_state, "f").timeout = null;
    }
    subscribe(fn) {
        if (!__classPrivateFieldGet(this, _Blinker_state, "f").subscribers.includes(fn)) {
            __classPrivateFieldGet(this, _Blinker_state, "f").subscribers.push(fn);
        }
        console.log('subscribe()', __classPrivateFieldGet(this, _Blinker_state, "f").subscribers, __classPrivateFieldGet(this, _Blinker_state, "f").blinks);
    }
    unsubscribe(fn) {
        __classPrivateFieldGet(this, _Blinker_state, "f").subscribers = __classPrivateFieldGet(this, _Blinker_state, "f").subscribers.filter(i => i !== fn);
        console.log('unsubscribe()', __classPrivateFieldGet(this, _Blinker_state, "f").subscribers, __classPrivateFieldGet(this, _Blinker_state, "f").blinks);
    }
}
exports.Blinker = Blinker;
_Blinker_initOptions = new WeakMap(), _Blinker_state = new WeakMap(), _Blinker_instances = new WeakSet(), _Blinker_on = function _Blinker_on() {
    __classPrivateFieldGet(this, _Blinker_state, "f").blinks++;
    __classPrivateFieldGet(this, _Blinker_state, "f").visible = true;
    __classPrivateFieldGet(this, _Blinker_state, "f").subscribers.forEach(fn => fn(true));
    __classPrivateFieldGet(this, _Blinker_state, "f").timeout = setTimeout(() => {
        __classPrivateFieldGet(this, _Blinker_instances, "m", _Blinker_off).call(this);
    }, __classPrivateFieldGet(this, _Blinker_state, "f").period * (1 - 1 / __classPrivateFieldGet(this, _Blinker_state, "f").ratio));
}, _Blinker_off = function _Blinker_off() {
    __classPrivateFieldGet(this, _Blinker_state, "f").blinks++;
    __classPrivateFieldGet(this, _Blinker_state, "f").visible = false;
    __classPrivateFieldGet(this, _Blinker_state, "f").subscribers.forEach(fn => fn(false));
    __classPrivateFieldGet(this, _Blinker_state, "f").timeout = setTimeout(() => {
        __classPrivateFieldGet(this, _Blinker_instances, "m", _Blinker_on).call(this);
    }, __classPrivateFieldGet(this, _Blinker_state, "f").period * (1 / __classPrivateFieldGet(this, _Blinker_state, "f").ratio));
};
