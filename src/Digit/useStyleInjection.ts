import { useInsertionEffect } from 'react';

const scopeAttributePrefix = 'data-style-scope-';
type Style = {
  id: string;
  content: string;
};

// Runtime style injection
const useHeadStyleInjection = (
  css: string,
  cssHash: string,
  dependencies = [],
  scoped = true // isolate css behind @scope
) => {
  const injector = new StyleInjector(); // singleton!
  const scopeAttribute = `${scopeAttributePrefix}-${cssHash}`;

  const style: Style = {
    id: `css_id__${cssHash}`,
    content: scoped ? wrapWithScope(css, scopeAttribute) : css,
  };

  useInsertionEffect(() => {
    injector.add(style);
    return () => injector.remove(style);
  }, dependencies);

  return {
    [scopeAttribute]: scoped ? true : undefined,
  };
};

export class StyleInjector {
  private static instance: StyleInjector; // singleton
  #state: Map<string, number> = new Map();

  constructor() {
    if (!StyleInjector.instance) {
      StyleInjector.instance = this;
    }
    return StyleInjector.instance;
  }
  add(s: Style) {
    if (this.has(s)) {
      const count = this.#state.get(s.id)! + 1;
      this.#state.set(s.id, count);
    } else {
      this.#state.set(s.id, 1);
    }

    if (this.#state.get(s.id) === 1) {
      document.head.appendChild(createStyleElement(s));
    }
  }
  remove(s: Style) {
    if (this.has(s)) {
      const count = this.#state.get(s.id)! - 1;
      this.#state.set(s.id, count);
    } else {
      console.warn(`(at useStyleInjection.ts) unable to remove style: ${s.id}`);
    }
    if (this.#state.get(s.id) === 0) {
      document.head.querySelector(`#${s.id}`)?.remove();
    }
  }
  has(s: Style) {
    return this.#state.has(s.id);
  }
}

const createStyleElement = (style: Style) => {
  const el = document.createElement('style');
  el.innerHTML = style.content;
  if (style.id !== '') el.id = style.id;
  return el;
};

const wrapWithScope = (css: string, scopeAttribute: string) => {
  // unused bc @scope at-rule does not work in Firefox
  const scoped =
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

export default useHeadStyleInjection;
