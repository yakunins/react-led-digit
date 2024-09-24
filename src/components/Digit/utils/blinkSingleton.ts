type BlinkFunction = (arg: BlinkSingleton['state']) => void;

export type BlinkSingleton = {
  subscribers: Function[];
  state?: 'on' | 'off';
  onInterval: null | ReturnType<typeof setTimeout>;
  offInterval: null | ReturnType<typeof setTimeout>;
  offTimeout: null | ReturnType<typeof setTimeout>;
  on: () => void;
  off: () => void;
  subscribe: (fn: BlinkFunction) => void;
  unsubscribe: (fn: BlinkFunction) => void;
  start: () => void;
  stop: () => void;
};

export const blinkSingleton = (_period = 1000) => {
  const instance: BlinkSingleton = {
    state: undefined,
    onInterval: null,
    offInterval: null,
    offTimeout: null,
    subscribers: [],
    on() {
      this.subscribers.forEach(fn => fn(this.state));
    },
    off() {
      this.subscribers.forEach(fn => fn(this.state));
    },
    start() {
      this.on();
      this.onInterval = setInterval(() => {
        this.state = 'on';
        this.on();
        this.offTimeout = setTimeout(() => {
          this.state = 'off';
          this.off();
        }, _period / 2);
      }, _period);
    },
    stop() {
      this.onInterval && clearInterval(this.onInterval);
      this.offInterval && clearInterval(this.offInterval);
      this.offTimeout && clearTimeout(this.offTimeout);
    },
    subscribe(fn) {
      this.subscribers.push(fn);
    },
    unsubscribe(fn) {
      this.subscribers.filter(i => i !== fn);
    },
  };
  return instance;
};
