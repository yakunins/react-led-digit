import { default as cx } from 'clsx';
import { DigitProps } from '../UnstyledDigit';
import { onOffCx, shapeCx } from './utils';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export type DotSegments = DivProps & {
  className?: string;
  off?: DigitProps['off'];
  shape?: DigitProps['shape'];
  DP?: boolean;
};

export const DotSegments = ({
  className,
  off,
  shape = 'default',
  DP,
  ...rest
}: DotSegments) => {
  return (
    <div className={cx('digit dot', shapeCx(shape), className)} {...rest}>
      <div className="opacity-wrapper off">
        <i className={cx('segment DP', onOffCx(DP, off))}></i>
      </div>
      <div className={cx('opacity-wrapper on', off && 'off')}>
        <i className={cx('segment DP', onOffCx(DP, off))}></i>
      </div>
    </div>
  );
};
