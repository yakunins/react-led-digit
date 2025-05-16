/**
 * Switches intrnal state periodically (visible), calling subscribers each time.
 */

type BlinkerSubscriber = (state: BlinkerState['visible']) => void;
type BlinkerState = {
  timeout: null | ReturnType<typeof setTimeout>;
  subscribers: BlinkerSubscriber[];
  ratio: number;
  period: number;
  visible: boolean;
};
type BlinkerOptions = {
  // Start blinking without explicit run() call, default is true
  autoRun?: boolean;
  // On to off ratio, e.g. ratio of visible phase to hidden phase, default is 1
  ratio?: BlinkerState['ratio'];
  // Blink period, milliseconds, default is 1000
  period?: BlinkerState['period'];
  // Visibility state, default is true
  visible?: BlinkerState['visible'];
  // If true (default), new Blinker() to return single instance, in order to sync multiple blinking components
  singleton?: boolean;
};

const defaultOptions: BlinkerOptions = {
  autoRun: true,
  period: 1000,
  ratio: 1,
  visible: true,
  singleton: true,
};

export class Blinker {
  private static instance: Blinker; // singleton has only one instance

  #options: BlinkerOptions = defaultOptions; // initial options
  #state: BlinkerState = {
    ratio: defaultOptions.ratio!,
    period: defaultOptions.period!,
    subscribers: [],
    timeout: null,
    visible: defaultOptions.visible!,
  };

  constructor(options?: BlinkerOptions) {
    const init = () => {
      this.#options = { ...this.#options, ...options }; // merge options
      this.#state.period = this.#options.period!;
      this.#state.ratio = this.#options.ratio!;
      this.#state.visible = this.#options.visible!;
      if (this.#options.autoRun) this.start();
    };
    if (options?.singleton === false) {
      init();
      return this;
    }
    if (!Blinker.instance) {
      Blinker.instance = this;
      init();
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
    this.#state.visible = true;
    this.#state.subscribers.forEach(fn => fn(true));
    this.#state.timeout = setTimeout(() => {
      this.#off();
    }, getPeriod(this.#state).on);
  }
  #off() {
    this.#state.visible = false;
    this.#state.subscribers.forEach(fn => fn(false));
    this.#state.timeout = setTimeout(() => {
      this.#on();
    }, getPeriod(this.#state).off);
  }

  start(visible = this.#state.visible) {
    if (this.#state.timeout) return; // already runnning
    visible ? this.#on() : this.#off(); // start blinking
  }
  stop() {
    if (this.#state.timeout) {
      clearTimeout(this.#state.timeout);
      this.#state.timeout = null;
    }
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

// ratio=1, tot=2, on=0.5, off=0.5
// ratio=2, tot=3, on=0.66, off=0.33
function getPeriod(state: BlinkerState) {
  const total = state.ratio + 1;
  return {
    on: state.period * (1 - 1 / total),
    off: state.period * (1 / total),
  };
}
