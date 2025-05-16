import { default as cx } from 'clsx';
import { DigitProps } from '../UnstyledDigit';
import { onOffCx, shapeCx } from './utils';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export type ColonSegments = DivProps & {
  className?: string;
  off?: DigitProps['off'];
  shape?: DigitProps['shape'];
  D1?: boolean;
  D2?: boolean;
};

export const ColonSegments = ({
  className,
  off,
  shape = 'default',
  D1,
  D2,
  ...rest
}: ColonSegments) => {
  return (
    <div className={cx('digit colon', shapeCx(shape), className)} {...rest}>
      <code className="aria-label">{rest['aria-label']}</code>
      <div className="opacity-wrapper off">
        <i className={cx('segment D1', onOffCx(D1, off))}></i>
        <i className={cx('segment D2', onOffCx(D2, off))}></i>
      </div>
      <div className={cx('opacity-wrapper on', off && 'off')}>
        <i className={cx('segment D1', onOffCx(D1, off))}></i>
        <i className={cx('segment D2', onOffCx(D2, off))}></i>
      </div>
    </div>
  );
};
