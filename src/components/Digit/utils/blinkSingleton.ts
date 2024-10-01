type BlinkSubscriber = (state: BlinkSingleton['visible']) => void;
type BlinkHandler = {
  timeout: null | ReturnType<typeof setTimeout>;
  subscribers: BlinkSubscriber[];
  on: (i: BlinkSingleton) => void;
  off: (i: BlinkSingleton) => void;
};

type BlinkSingletonOptions = {
  // Start blinking immediatelly after instance creation.
  autoRun?: boolean;
  period?: BlinkSingleton['period'];
  ratio?: BlinkSingleton['ratio'];
  visible?: BlinkSingleton['visible'];
};

const defaultOpts = {
  autoRun: true,
  period: 1000,
  ratio: 1,
  visible: true,
};

export type BlinkSingleton = {
  // Blinking period, in milliseconds
  period: number;
  // Ratio of visible period to hidden periods
  ratio: number;
  // Visibility state
  visible: boolean;
  subscribe: (fn: BlinkSubscriber) => void;
  unsubscribe: (fn: BlinkSubscriber) => void;
  run: (opts?: BlinkSingletonOptions) => void;
  stop: () => void;
};

const handler: BlinkHandler = {
  timeout: null,
  subscribers: [],
  on(i: BlinkSingleton) {
    i.visible = true;
    this.subscribers.forEach(fn => fn(true));
    this.timeout = setTimeout(() => {
      this.off(i);
    }, i.period * i.ratio);
  },
  off(i: BlinkSingleton) {
    i.visible = false;
    this.subscribers.forEach(fn => fn(false));
    this.timeout = setTimeout(() => {
      this.on(i);
    }, i.period / i.ratio);
  },
};

export const blinkSingleton = (opts = defaultOpts) => {
  const options = { ...defaultOpts, ...opts };
  const instance: BlinkSingleton = {
    period: options.period,
    visible: options.visible,
    ratio: options.ratio,
    run(opts2 = options) {
      const options2 = { ...options, ...opts2 };
      if (handler.timeout) {
        if (
          this.period === options2.period &&
          this.visible === options2.visible &&
          this.ratio === options2.ratio
        )
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
