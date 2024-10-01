"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blinkSingleton = void 0;
const defaultOpts = {
    autoRun: true,
    period: 1000,
    ratio: 1,
    visible: true,
};
const handler = {
    timeout: null,
    subscribers: [],
    on(i) {
        i.visible = true;
        this.subscribers.forEach(fn => fn(true));
        this.timeout = setTimeout(() => {
            this.off(i);
        }, i.period * i.ratio);
    },
    off(i) {
        i.visible = false;
        this.subscribers.forEach(fn => fn(false));
        this.timeout = setTimeout(() => {
            this.on(i);
        }, i.period / i.ratio);
    },
};
const blinkSingleton = (opts = defaultOpts) => {
    const options = Object.assign(Object.assign({}, defaultOpts), opts);
    const instance = {
        period: options.period,
        visible: options.visible,
        ratio: options.ratio,
        run(opts2 = options) {
            const options2 = Object.assign(Object.assign({}, options), opts2);
            if (handler.timeout) {
                if (this.period === options2.period &&
                    this.visible === options2.visible &&
                    this.ratio === options2.ratio)
                    return; // if nothing has changed, keep running
                this.stop();
            }
            this.period = options2.period;
            this.ratio = options2.ratio;
            this.visible = options2.visible;
            this.visible ? handler.on(this) : handler.off(this); // run here
        },
        stop() {
            handler.timeout && clearTimeout(handler.timeout);
            handler.timeout = null;
        },
        subscribe(fn) {
            if (!handler.subscribers.includes(fn)) {
                handler.subscribers.push(fn);
            }
        },
        unsubscribe(fn) {
            handler.subscribers.filter(i => i !== fn);
        },
    };
    options.autoRun && instance.run();
    return instance;
};
exports.blinkSingleton = blinkSingleton;
