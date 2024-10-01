type BlinkSubscriber = (state: BlinkSingleton['visible']) => void;
type BlinkSingletonOptions = {
    autoRun?: boolean;
    period?: BlinkSingleton['period'];
    ratio?: BlinkSingleton['ratio'];
    visible?: BlinkSingleton['visible'];
};
export type BlinkSingleton = {
    period: number;
    ratio: number;
    visible: boolean;
    subscribe: (fn: BlinkSubscriber) => void;
    unsubscribe: (fn: BlinkSubscriber) => void;
    run: (opts?: BlinkSingletonOptions) => void;
    stop: () => void;
};
export declare const blinkSingleton: (opts?: {
    autoRun: boolean;
    period: number;
    ratio: number;
    visible: boolean;
}) => BlinkSingleton;
export {};
