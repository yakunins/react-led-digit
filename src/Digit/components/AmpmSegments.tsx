import { default as cx } from 'clsx';
import { DigitProps } from '../UnstyledDigit';
import { onOffCx, shapeCx } from './utils';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export type AmpmSegments = DivProps & {
  className?: string;
  off?: DigitProps['off'];
  shape?: DigitProps['shape'];
  AM?: boolean;
  PM?: boolean;
};

export const AmpmSegments = ({
  className,
  off,
  shape = 'default',
  AM,
  PM,
  ...rest
}: AmpmSegments) => {
  return (
    <div className={cx('digit ampm', shapeCx(shape), className)} {...rest}>
      <code className="aria-label">{rest['aria-label']}</code>
      <div className="opacity-wrapper off">
        <i className={cx('segment AM', onOffCx(AM, off))}></i>
        <i className={cx('segment PM', onOffCx(PM, off))}></i>
      </div>
      <div className={cx('opacity-wrapper on', off && 'off')}>
        <i className={cx('segment AM', onOffCx(AM, off))}></i>
        <i className={cx('segment PM', onOffCx(PM, off))}></i>
      </div>
    </div>
  );
};
