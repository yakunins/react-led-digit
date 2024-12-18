/* This file is auto-generated */

const css = {
  src: `src/Digit/digit.css`,
  hash: `2ftmruudz6u`,
  content: `
/**
 *    A
 *  F   B      D2      AM
 *    G 
 *  E   C      D1      PM
 *    D       DP
 */

.digit {
  --color: var(--segment-color, currentColor);
  --color-off: var(--segment-color-off, var(--color));
  --thickness: var(--segment-thickness, 0.25em); /* =4px */
  --length: var(--segment-length, 1em);
  --spacing: var(--segment-spacing, 0.0625em); /* =1px */
  --shift-ad: var(--segment-shift-ad, 0em); /* squeezes segments A and D */
  --opacity-on: var(--segment-opacity-on, 1);
  --opacity-off: var(--segment-opacity-off, 0.1);
  --transition-duration: var(--segment-transition-duration, 0.25s);
  /* distortion of diamond corners */
  --corner-shift: var(--segment-corner-shift, 0em);

  --svg-am: url('data:image/svg+xml,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:black;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:1;}</style><polyline class="st0" points="1.4,11.5 1.4,11.4 3.8,3.5 4.2,3.5 6.6,11.4 6.6,11.5 "/><polyline class="st0" points="14.5,11.5 14.5,3.5 14.1,3.5 11.5,9.9 11.3,9.9 8.9,3.5 8.5,3.5 8.5,11.5 "/><line class="st0" x1="2.6" y1="9.5" x2="5.4" y2="9.5"/></svg>');
  --svg-pm: url('data:image/svg+xml,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:black;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:1;}</style><path class="st0" d="M1.5,11.5V3.4h2.1c1.6,0,2.5,1,2.5,2.2s-1,2.3-2.5,2.3H2.2"/><polyline class="st0" points="14.5,11.5 14.5,3.5 14.1,3.5 11.5,9.9 11.3,9.9 8.9,3.5 8.5,3.5 8.5,11.5 "/></svg>');

  /* computed values */
  --thick: var(--thickness);
  --thick-half: calc(var(--thick) * 0.5);
  --digit-width: calc(var(--length) + var(--thick) + var(--spacing));
  --digit-height: calc(var(--length) * 2 + var(--thick) + var(--spacing) * 2);

  --thick-minus: calc(var(--thick) * -1);
  --th-half: calc(var(--thick) / 2);
  --th-half-minus: calc(var(--th-half) * -1);
  --spacing-minus: calc(var(--spacing) * -1);
  --sp-half: calc(var(--spacing) / 2);
  --sp-half-minus: calc(var(--sp-half) * -1);

  --radius-round: calc(var(--thick) * 0.33);
  --radius-pill: var(--thick-half, 10em);

  display: inline-block;
  position: relative;
  width: var(--digit-width);
  height: var(--digit-height);

  /* prevents flex-shrink effect */
  min-width: var(--digit-width);
  min-height: var(--digit-height);

  &.unknown {
    width: var(--thick);
    min-width: var(--thick);
  }

  .hidden-value {
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

  /* segments */
  .segment {
    --th-half-100: calc(100% - var(--th-half));
    --shft: var(--corner-shift);

    background-color: var(--color);
    display: block;
    position: absolute;

    &.segment.off {
      background-color: var(--color-off);
      border-color: var(--color-off);
    }
    /* vertical segments */
    &.vertical {
      width: var(--thick);
      height: var(--length);
      left: 0;

      &.B,
      &.C {
        left: auto;
        right: 0;
      }
    }
    &.E,
    &.C {
      bottom: calc(var(--th-half) + var(--sp-half));
    }
    &.F,
    &.B {
      top: calc(var(--th-half) + var(--sp-half));
    }

    /* horizontal segments */
    &.horizontal {
      width: var(--length);
      height: var(--thick);
      left: calc(var(--th-half) + var(--sp-half));

      &.A,
      &.D {
        width: calc(var(--length) + var(--shft) * 2);
        left: calc(var(--th-half) + var(--sp-half) - var(--shft));
      }
      &.A {
        top: calc(var(--shift-ad) + var(--shft));
      }
      &.D {
        bottom: calc(var(--shift-ad) + var(--shft));
      }
      &.G {
        bottom: calc(var(--length) + var(--spacing));
      }
    }

    /* spearheads */
    &.horizontal {
      clip-path: polygon(
        0% 50%,
        var(--th-half) 0%,
        var(--th-half-100) 0%,
        100% 50%,
        var(--th-half-100) 100%,
        var(--th-half) 100%
      );
      &.A {
        /* x y */
        clip-path: polygon(
          0% calc(50% - var(--shft)),
          calc(var(--th-half) - var(--shft)) 0%,
          calc(var(--th-half-100) + var(--shft)) 0%,
          100% calc(50% - var(--shft)),
          calc(var(--th-half-100) - var(--shft)) 100%,
          calc(var(--th-half) + var(--shft)) 100%
        );
      }
      &.D {
        /* x y */
        clip-path: polygon(
          0% calc(50% + var(--shft)),
          calc(var(--th-half) + var(--shft)) 0%,
          calc(var(--th-half-100) - var(--shft)) 0%,
          100% calc(50% + var(--shft)),
          calc(var(--th-half-100) + var(--shft)) 100%,
          calc(var(--th-half) - var(--shft)) 100%
        );
      }
    }
    &.vertical {
      clip-path: polygon(
        50% 0%,
        0% var(--th-half),
        0% var(--th-half-100),
        50% 100%,
        100% var(--th-half-100),
        100% var(--th-half)
      );
      &.B {
        /* x y */
        clip-path: polygon(
          calc(50% + var(--shft)) 0%,
          0% calc(var(--th-half) + var(--shft)),
          0% var(--th-half-100),
          50% 100%,
          100% var(--th-half-100),
          100% calc(var(--th-half) - var(--shft))
        );
      }
      &.C {
        /* x y */
        clip-path: polygon(
          50% 0%,
          0% var(--th-half),
          0% calc(var(--th-half-100) - var(--shft)),
          calc(50% + var(--shft)) 100%,
          100% calc(var(--th-half-100) + var(--shft)),
          100% var(--th-half)
        );
      }
      &.E {
        /* x y */
        clip-path: polygon(
          50% 0%,
          0% var(--th-half),
          0% calc(var(--th-half-100) + var(--shft)),
          calc(50% - var(--shft)) 100%,
          100% calc(var(--th-half-100) - var(--shft)),
          100% var(--th-half)
        );
      }
      &.F {
        /* x y */
        clip-path: polygon(
          calc(50% - var(--shft)) 0%,
          0% calc(var(--th-half) - var(--shft)),
          0% var(--th-half-100),
          50% 100%,
          100% var(--th-half-100),
          100% calc(var(--th-half) + var(--shft))
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
    --digit-width: calc(var(--length) + var(--thick) + var(--spacing));

    .segment {
      background: var(--color);
      width: var(--digit-width);
      height: var(--length);

      mask-origin: fill-box;
      mask-position: center;
      mask-repeat: no-repeat;
      mask-size:
        auto 85%,
        contain;
    }

    .AM {
      bottom: calc(var(--digit-height) / 2 + var(--thick) / 4);
      mask-image: var(--svg-am);
    }
    &.shape-rect .AM,
    &.shape-pill .AM,
    &.shape-round .AM {
      mask-composite: exclude;
      mask-image: var(--svg-am), linear-gradient(var(--color) 0 0);
    }
    .PM {
      top: calc(var(--digit-height) / 2 + var(--thick) / 4);
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
    --digit-width: calc(var(--thick) * 3);

    & .segment {
      --dot-border-width: calc(var(--thick) * 0.6);

      border: var(--dot-border-width) solid var(--color); /* dot made from border to have same size on zoom */
      position: absolute;
      width: 0;
      height: 0;
      left: calc(var(--digit-width) / 2 - var(--dot-border-width));
    }
    /* lower part of a colon */
    .segment.D1 {
      top: calc(var(--digit-height) / 3 - var(--thick) / 2);
    }
    /* upper part of a colon */
    .segment.D2 {
      bottom: calc(var(--digit-height) / 3 - var(--thick) / 2);
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
`,
};

export default css;
