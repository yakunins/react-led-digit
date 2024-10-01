type BlinkerSubscriber = (state: BlinkerState['visible']) => void;
type BlinkerState = {
  timeout: null | ReturnType<typeof setTimeout>;
  subscribers: BlinkerSubscriber[];
  period: number;
  ratio: number;
  visible: boolean;
  blinks: number;
};
type BlinkerOptions = {
  // Start blinking without explicit run() call, default is true
  autoRun?: boolean;
  // Blink period, milliseconds, default is 1000
  period?: BlinkerState['period'];
  // Ratio of visible period duration to hidden period duration, default is 1
  ratio?: BlinkerState['ratio'];
  // Visibility state, default is true
  visible?: BlinkerState['visible'];
};

const defaultOptions: BlinkerOptions = {
  autoRun: true,
  period: 1000,
  ratio: 1,
  visible: true,
};

export class Blinker {
  private static instance: Blinker; // singletone has only one instance

  #initOptions: BlinkerOptions = defaultOptions; // store options
  #state: BlinkerState = {
    timeout: null,
    subscribers: [],
    period: defaultOptions.period!,
    ratio: defaultOptions.ratio!,
    visible: defaultOptions.visible!,
    blinks: 0,
  };

  constructor(options = defaultOptions) {
    if (!Blinker.instance) {
      Blinker.instance = this;
      this.#initOptions = { ...defaultOptions, ...options };
      this.#state.period = this.#initOptions.period!;
      this.#state.ratio = this.#initOptions.ratio!;
      this.#state.visible = this.#initOptions.visible!;
      if (this.#initOptions.autoRun) this.start();
    }
    return Blinker.instance;
  }

  get period() {
    return this.#state.period;
  }
  get ratio() {
    return this.#state.ratio;
  }
  get visible() {
    return this.#state.visible;
  }
  set period(val: BlinkerState['period']) {
    if (val !== this.#state.period && val !== 0) {
      this.#state.period = Math.abs(val);
      this.start();
    }
  }
  set ratio(val: BlinkerState['ratio']) {
    if (val !== this.#state.ratio && val !== 0) {
      this.#state.ratio = Math.abs(val);
      this.start();
    }
  }
  set visible(val: BlinkerState['visible']) {
    if (val !== this.#state.visible) {
      this.#state.visible = val;
      this.start();
    }
  }

  #on() {
    this.#state.blinks++;
    this.#state.visible = true;
    this.#state.subscribers.forEach(fn => fn(true));
    this.#state.timeout = setTimeout(
      () => {
        this.#off();
      },
      this.#state.period * (1 - 1 / this.#state.ratio)
    );
  }
  #off() {
    this.#state.blinks++;
    this.#state.visible = false;
    this.#state.subscribers.forEach(fn => fn(false));
    this.#state.timeout = setTimeout(
      () => {
        this.#on();
      },
      this.#state.period * (1 / this.#state.ratio)
    );
  }

  start(visible = this.#state.visible) {
    if (this.#state.timeout) this.stop();
    visible ? this.#on() : this.#off(); // start blinking
  }
  stop() {
    this.#state.timeout && clearTimeout(this.#state.timeout);
    this.#state.timeout = null;
  }
  subscribe(fn: BlinkerSubscriber) {
    if (!this.#state.subscribers.includes(fn)) {
      this.#state.subscribers.push(fn);
    }
  }
  unsubscribe(fn: BlinkerSubscriber) {
    this.#state.subscribers = this.#state.subscribers.filter(i => i !== fn);
  }
}
