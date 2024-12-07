declare module '*.css.js' {
  const css: {
    src: string;
    hash: string;
    content: string;
  };
  export default css;
}
