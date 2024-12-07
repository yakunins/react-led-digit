import { DigitProps } from '../UnstyledDigit';

export const onOffCx = (value?: boolean, off?: boolean) =>
  value && !off ? 'on' : 'off';

export const shapeCx = (shape: DigitProps['shape']) => {
  if (!shape) {
    return null;
  }
  return 'shape-' + shape;
};
