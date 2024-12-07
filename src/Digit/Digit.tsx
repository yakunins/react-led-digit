import { Digit as UnstyledDigit } from './UnstyledDigit';
import useHeadStyleInjection from './useStyleInjection';
import { default as css } from './digit.css.js';

export type Digit = UnstyledDigit;
export const Digit = ({ ...rest }: Digit) => {
  const scopeAttribute = useHeadStyleInjection(css.content, css.hash, []);

  return (
    <div {...scopeAttribute} style={{ display: 'contents' }}>
      <UnstyledDigit {...rest} />
    </div>
  );
};
