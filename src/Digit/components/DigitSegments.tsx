import { default as cx } from 'clsx';
import { DigitProps } from '../UnstyledDigit';
import { onOffCx, shapeCx } from './utils';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export type DigitSegments = DivProps & {
  className?: string;
  off?: DigitProps['off'];
  shape?: DigitProps['shape'];
  A?: boolean; // top
  B?: boolean;
  C?: boolean;
  D?: boolean; // bottom
  E?: boolean;
  F?: boolean;
  G?: boolean; // middle
};

export const DigitSegments = ({
  className,
  off,
  shape = 'default',
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  ...rest
}: DigitSegments) => {
  return (
    <div className={cx('digit', shapeCx(shape), className)} {...rest}>
      <code className="aria-label" aria-hidden="true">{rest['aria-label']}</code>
      <div className="opacity-wrapper off">
        <i className={cx('segment A horizontal', onOffCx(A, off))}></i>
        <i className={cx('segment B vertical', onOffCx(B, off))}></i>
        <i className={cx('segment C vertical', onOffCx(C, off))}></i>
        <i className={cx('segment D horizontal', onOffCx(D, off))}></i>
        <i className={cx('segment E vertical', onOffCx(E, off))}></i>
        <i className={cx('segment F vertical', onOffCx(F, off))}></i>
        <i className={cx('segment G horizontal', onOffCx(G, off))}></i>
      </div>
      <div className={cx('opacity-wrapper on', off && 'off')}>
        <i className={cx('segment A horizontal', onOffCx(A, off))}></i>
        <i className={cx('segment B vertical', onOffCx(B, off))}></i>
        <i className={cx('segment C vertical', onOffCx(C, off))}></i>
        <i className={cx('segment D horizontal', onOffCx(D, off))}></i>
        <i className={cx('segment E vertical', onOffCx(E, off))}></i>
        <i className={cx('segment F vertical', onOffCx(F, off))}></i>
        <i className={cx('segment G horizontal', onOffCx(G, off))}></i>
      </div>
    </div>
  );
};
