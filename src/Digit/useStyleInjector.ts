import { useInsertionEffect } from 'react';

type Style = {
  id: string;
  content: string;
};

type InjectorOptions = {
  scopeID?: string;
  scopeAttributePrefix?: string;
  selector?: string;
};

const defaultInjectorOptions: InjectorOptions = {
  scopeAttributePrefix: 'data-style-scope-',
  selector: 'head',
};

// Runtime style injection
const useStyleInjector = (
  css: string,
  dependencies = [],
  options?: InjectorOptions
) => {
  const injector = new StyleInjector(); // singleton
  const o = { ...defaultInjectorOptions, ...options };
  const id = o?.scopeID || injector.generateID(css);
  const scopeAttribute = `${o.scopeAttributePrefix}${id}`;

  const style: Style = {
    id: `css_id__${id}`,
    content: o.scopeID ? wrapWithScope(css, scopeAttribute) : css,
  };

  useInsertionEffect(() => {
    injector.increase(style);
    return () => injector.reduce(style);
  }, dependencies);

  return {
    [scopeAttribute]: o.scopeID ? true : undefined,
  };
};

// Inject style into head
export class StyleInjector {
  private static instance: StyleInjector;
  #styles: Map<string, number> = new Map();

  constructor() {
    if (!StyleInjector.instance) {
      StyleInjector.instance = this;
    }
    return StyleInjector.instance; // singleton
  }

  increase(s: Style) {
    if (this.count(s) === 0) document.head.appendChild(createStyleElement(s));
    if (this.count(s) >= 0) this.#styles.set(s.id, this.count(s) + 1);
  }
  reduce(s: Style) {
    if (this.count(s) > 0) this.#styles.set(s.id, this.count(s) - 1);
    if (this.count(s) === 0) document.head.querySelector(`#${s.id}`)?.remove();
  }
  count(s: Style) {
    if (this.#styles.has(s.id)) return this.#styles.get(s.id) as number;
    return 0;
  }
  generateID = (s: string) => cyrb53string(s);
}

const createStyleElement = (style: Style) => {
  const el = document.createElement('style');
  el.innerHTML = style.content;
  if (style.id !== '') el.id = style.id;
  return el;
};

const wrapWithScope = (css: string, scopeAttribute: string) => {
  const scoped = // unused bc @scope at-rule does not work in Firefox
    `@scope ([${scopeAttribute}]) {` +
    `:scope { display: contents; }` +
    `${css}` +
    `}`;

  const isolated =
    `[${scopeAttribute}] { display: contents; }` +
    `[${scopeAttribute}] {` +
    `${css}` +
    `}`;

  return isolated;
};

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const cyrb53string = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  const num = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return num.toString(36);
};

export default useStyleInjector;
