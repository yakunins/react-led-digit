import { Digit as UnstyledDigit } from './UnstyledDigit';
import useStyleInjector from './useStyleInjector';
import { default as css } from './digit.css.generated.js';

export type Digit = UnstyledDigit;
export const Digit = ({ ...rest }: Digit) => {
  const scopeAttribute = useStyleInjector(css.content, [], {
    scopeID: css.hash,
  });

  if (Object.entries(scopeAttribute)[0].includes(true))
    return (
      <div {...scopeAttribute} style={{ display: 'contents' }}>
        <UnstyledDigit {...rest} />
      </div>
    );

  return <UnstyledDigit {...rest} />;
};
