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
    autoRun?: boolean;
    period?: BlinkerState['period'];
    ratio?: BlinkerState['ratio'];
    visible?: BlinkerState['visible'];
};
export declare class Blinker {
    #private;
    private static instance;
    constructor(options?: BlinkerOptions);
    get period(): BlinkerState['period'];
    get ratio(): BlinkerState['ratio'];
    get visible(): BlinkerState['visible'];
    set period(val: BlinkerState['period']);
    set ratio(val: BlinkerState['ratio']);
    set visible(val: BlinkerState['visible']);
    start(visible?: boolean): void;
    stop(): void;
    subscribe(fn: BlinkerSubscriber): void;
    unsubscribe(fn: BlinkerSubscriber): void;
}
export {};
