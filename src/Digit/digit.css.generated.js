/* This file is auto-generated */

const css = {
  src: `src/Digit/digit.css`,
  hash: `8v5snasxzy`,
  content: `
/**
 *    A
 *  F   B      D2      AM
 *    G 
 *  E   C      D1      PM
 *    D       DP
 */

.digit {
  --scale: 1;
  --thickness: calc(var(--segment-thickness, 0.25em) * var(--scale)); /* 4px */
  --length: calc(var(--segment-length, 1em) * var(--scale));
  --spacing: calc(var(--segment-spacing, 0.0625em) * var(--scale)); /* 1px */
  --ad: calc(
    var(--segment-shift-ad, 0em) * var(--scale)
  ); /* moves segments A, D in vertical direction */
  --corner-shift: var(
    --segment-corner-shift,
    0em
  ); /* distortion of outer corners of a digit */

  --color: var(--segment-color, currentColor);
  --color-off: var(--segment-color-off, var(--color));
  --opacity-on: var(--segment-opacity-on, 1);
  --opacity-off: var(--segment-opacity-off, 0.1);
  --transition-duration: var(--segment-transition-duration, 0.25s);

  --svg-am: url('data:image/svg+xml,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:black;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:1;}</style><polyline class="st0" points="1.4,11.5 1.4,11.4 3.8,3.5 4.2,3.5 6.6,11.4 6.6,11.5 "/><polyline class="st0" points="14.5,11.5 14.5,3.5 14.1,3.5 11.5,9.9 11.3,9.9 8.9,3.5 8.5,3.5 8.5,11.5 "/><line class="st0" x1="2.6" y1="9.5" x2="5.4" y2="9.5"/></svg>');
  --svg-pm: url('data:image/svg+xml,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:black;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:1;}</style><path class="st0" d="M1.5,11.5V3.4h2.1c1.6,0,2.5,1,2.5,2.2s-1,2.3-2.5,2.3H2.2"/><polyline class="st0" points="14.5,11.5 14.5,3.5 14.1,3.5 11.5,9.9 11.3,9.9 8.9,3.5 8.5,3.5 8.5,11.5 "/></svg>');

  /* computed values */
  --len: var(--length);
  --thk: var(--thickness);
  --thk-minus: calc(var(--thk) * -1);
  --thk-half: calc(var(--thk) / 2);
  --thk-half-minus: calc(var(--thk) / -2);

  --spc: calc(var(--spacing) / 1.4142); /* divided by sqrt(2) */
  --spc-minus: calc(var(--spc) * -1);
  --crn: var(--corner-shift);

  --radius-round: calc(var(--thk) * 0.33);
  --radius-pill: var(--thk, 10em);

  display: inline-block;
  position: relative;

  --digit-width: calc(var(--len) + var(--thk) + var(--spc) * 2);
  --digit-height: calc(var(--len) * 2 + var(--thk) + var(--spc) * 4);

  width: var(--digit-width);
  height: var(--digit-height);
  min-width: var(--digit-width); /* to prevent flex-shrink effects */
  min-height: var(--digit-height);

  &.ampm {
    --digit-width: calc(var(--len) + var(--thk) + var(--spc));
  }
  &.dot,
  &.colon {
    --digit-width: calc(var(--thk) * 3);
  }
  &.unknown {
    --digit-width: var(--len);
  }

  .aria-label {
    display: none;
  }

  .opacity-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &.digit,
  .opacity-wrapper,
  .opacity-wrapper .segment {
    transition-property: all;
    transition-duration: var(--transition-duration);
  }

  .opacity-wrapper.off.on .segment.off,
  .opacity-wrapper.on .segment.off,
  .opacity-wrapper.off .segment.on {
    visibility: hidden;
  }
  .opacity-wrapper.off .segment.off,
  .opacity-wrapper.on .segment.on {
    visibility: visible;
  }

  .opacity-wrapper.on {
    opacity: var(--opacity-on);
  }
  .opacity-wrapper.off {
    opacity: var(--opacity-off);
  }
  .opacity-wrapper.off.on {
    opacity: 0;
  }
  .opacity-wrapper.on:not(.off) .segment.on {
    opacity: 1;
  }
  .opacity-wrapper.on:not(.off) .segment.off {
    opacity: 0;
  }

  /* segments pos */
  .segment {
    background-color: var(--color);
    display: block;
    position: absolute;

    &.segment.off {
      background-color: var(--color-off);
      border-color: var(--color-off);
    }

    /* vertical segments pos */
    &.vertical {
      --x100--thk-half: var(--thk-half);
      --y100--thk-half: calc(var(--len) - var(--thk-half));
      width: var(--thk);
      height: var(--len);
      left: 0;

      &.B,
      &.C {
        left: calc(var(--len) + var(--spc) * 2);
      }
    }
    &.F,
    &.B {
      top: calc(var(--thk-half) + var(--spc));
    }
    &.E,
    &.C {
      top: calc(var(--thk-half) + var(--len) + var(--spc) * 3);
    }

    /* horizontal segments pos */
    &.horizontal {
      --x100--thk-half: calc(var(--len) - var(--thk-half));
      --y100--thk-half: var(--thk-half);

      width: var(--len);
      height: var(--thk);
      left: calc(var(--thk-half) + var(--spc));

      &.A,
      &.D {
        width: calc(var(--len) + var(--crn) * 2);
        left: calc(var(--thk-half) + var(--spc) - var(--crn));
      }
      &.A {
        top: calc(var(--ad) + var(--crn));
      }
      &.D {
        top: calc(var(--len) * 2 + var(--spc) * 4 - var(--ad) - var(--crn));
      }
      &.G {
        top: calc(var(--len) + var(--spc) * 2);
      }
    }

    /* spearheads */
    &.horizontal {
      &.A {
        /* x y */
        clip-path: polygon(
          0% calc(50% - var(--crn)),
          calc(var(--thk-half) - var(--crn)) 0%,
          calc(var(--x100--thk-half) + var(--crn) * 3) 0%,
          100% calc(50% - var(--crn)),
          calc(var(--x100--thk-half) + var(--crn)) 100%,
          calc(var(--thk-half) + var(--crn)) 100%
        );
      }
      &.G {
        clip-path: polygon(
          0% 50%,
          var(--thk-half) 0%,
          var(--x100--thk-half) 0%,
          100% 50%,
          var(--x100--thk-half) 100%,
          var(--thk-half) 100%
        );
      }
      &.D {
        /* x y */
        clip-path: polygon(
          0% calc(50% + var(--crn)),
          calc(var(--thk-half) + var(--crn)) 0%,
          calc(var(--x100--thk-half) + var(--crn)) 0%,
          100% calc(50% + var(--crn)),
          calc(var(--x100--thk-half) + var(--crn) * 3) 100%,
          calc(var(--thk-half) - var(--crn)) 100%
        );
      }
    }
    &.vertical {
      clip-path: polygon(
        50% 0%,
        0% var(--thk-half),
        0% var(--y100--thk-half),
        50% 100%,
        100% var(--y100--thk-half),
        100% var(--thk-half)
      );
      &.B {
        /* x y */
        clip-path: polygon(
          calc(50% + var(--crn)) 0%,
          0% calc(var(--thk-half) + var(--crn)),
          0% var(--y100--thk-half),
          50% 100%,
          100% var(--y100--thk-half),
          100% calc(var(--thk-half) - var(--crn))
        );
      }
      &.C {
        /* x y */
        clip-path: polygon(
          50% 0%,
          0% var(--thk-half),
          0% calc(var(--y100--thk-half) - var(--crn)),
          calc(50% + var(--crn)) 100%,
          100% calc(var(--y100--thk-half) + var(--crn)),
          100% var(--thk-half)
        );
      }
      &.E {
        /* x y */
        clip-path: polygon(
          50% 0%,
          0% var(--thk-half),
          0% calc(var(--y100--thk-half) + var(--crn)),
          calc(50% - var(--crn)) 100%,
          100% calc(var(--y100--thk-half) - var(--crn)),
          100% var(--thk-half)
        );
      }
      &.F {
        /* x y */
        clip-path: polygon(
          calc(50% - var(--crn)) 0%,
          0% calc(var(--thk-half) - var(--crn)),
          0% var(--y100--thk-half),
          50% 100%,
          100% var(--y100--thk-half),
          100% calc(var(--thk-half) + var(--crn))
        );
      }
    }
  }

  /* segment shapes */
  &.shape-default .segment.segment,
  &.shape-rect .segment.segment {
    border-radius: 0;
  }
  &.shape-round .segment.segment {
    border-radius: var(--radius-round);
  }
  &.shape-pill .segment.segment {
    border-radius: var(--radius-pill);
  }

  &.shape-rect,
  &.shape-round,
  &.shape-pill {
    .segment.segment.horizontal {
      clip-path: polygon(0% 50%, 0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%);
    }
    .segment.segment.vertical {
      clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 50% 100%, 100% 100%, 100% 0%);
    }
  }

  &.ampm {
    .segment {
      background: var(--color);
      width: var(--digit-width);
      height: var(--len);

      mask-origin: fill-box;
      mask-position: center;
      mask-repeat: no-repeat;
      mask-size:
        auto 85%,
        contain;
    }

    .AM {
      top: calc(var(--digit-height) / 2 - var(--thk) / 4 - var(--len));
      mask-image: var(--svg-am);
    }
    &.shape-rect .AM,
    &.shape-pill .AM,
    &.shape-round .AM {
      mask-composite: exclude;
      mask-image: var(--svg-am), linear-gradient(var(--color) 0 0);
    }
    .PM {
      top: calc(var(--digit-height) / 2 + var(--thk) / 4);
      mask-image: var(--svg-pm);
    }
    &.shape-rect .PM,
    &.shape-pill .PM,
    &.shape-round .PM {
      mask-composite: exclude;
      mask-image: var(--svg-pm), linear-gradient(var(--color) 0 0);
    }
    &.shape-round .segment {
      border-radius: var(--radius-round);
    }
    &.shape-pill .segment {
      border-radius: var(--radius-pill);
    }
  }

  &.dot,
  &.colon {
    & .segment {
      --dot-border-width: calc(var(--thk) * 0.6);
      --dot-size: calc(var(--dot-border-width) * 2);
      --dots-distance: calc(var(--digit-height) / 8);

      position: absolute;
      width: var(--dot-size);
      height: var(--dot-size);
      left: calc(var(--digit-width) / 2 - var(--dot-border-width));
    }
    /* lower part of a colon */
    .segment.D1 {
      top: calc(
        var(--digit-height) / 2 - var(--dots-distance) - var(--dot-size)
      );
    }
    /* upper part of a colon */
    .segment.D2 {
      top: calc(var(--digit-height) / 2 + var(--dots-distance));
    }
    /* dot itself */
    .segment.DP {
      bottom: 0;
    }
    &.shape-default .segment {
      border-radius: var(--radius-pill);
    }
  }
}

/* better subpixel rendering (Chrome) */
.digit {
  transform: rotate3d(1, -1, 0, 0.025deg);
}

/* better subpixel rendering (Firefox) */
@-moz-document url-prefix() {
  .digit {
    --scale: 4;
    --descale: calc(1 / var(--scale));
    --descaled-width: calc(var(--digit-width) / var(--scale));
    --descaled-height: calc(var(--digit-height) / var(--scale));

    transform: scale(var(--descale)) rotate3d(1, -1, 0, 0.025deg);
    transform-origin: 0% 0%;

    width: var(--descaled-width);
    height: var(--descaled-height);
    min-width: var(--descaled-width);
    min-height: var(--descaled-height);
  }
}
`,
};

export default css;
