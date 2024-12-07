const chokidar = require('chokidar');
const fs = require('fs');

const cfg = {
  watchParameter: '--watch',
  watch: {
    paths: ['./src'],
    extensions: ['css'],
  },
  outputPath: path => `${path}.js`,
};

const watching = process.argv.includes(cfg.watchParameter);
const ignorePaths = (path, stats) =>
  stats?.isFile() && !cfg.watch.extensions.includes(getExtension(path, stats));
const watch = watcherInstance =>
  watcherInstance
    .on('add', path => handleFile(path, 'add'))
    .on('change', path => handleFile(path, 'change'))
    .on('unlink', path => handleFile(path, 'remove'));

if (watching) {
  console.log('css-to-js: watching...');
  const watcher = chokidar.watch(cfg.watch.paths, {
    ignored: ignorePaths,
    persistent: true,
  });
  watch(watcher);
} else {
  console.log('css-to-js: run once');
  const watcher = chokidar.watch(cfg.watch.paths, {
    ignored: ignorePaths,
    persistent: false,
  });
  watch(watcher);
}

const handleFile = (path, action) => {
  const inputPath = path.replace(/\\/g, '/');
  const outputPath = cfg.outputPath(inputPath);
  if (action === 'add') {
    convert(inputPath);
    console.log(`css-to-js: ${outputPath} was added`);
    return;
  }
  if (action === 'change') {
    convert(inputPath);
    console.log(`css-to-js: ${outputPath} was updated`);
    return;
  }
  if (action === 'remove') {
    remove(outputPath);
    console.log(`css-to-js: ${outputPath} was removed`);
    return;
  }
};

const template = (text, sourcePath) => `/* This file is auto-generated */\n
const css = {
  src: \`${sourcePath}\`,
  hash: \`${hash(text)}\`,
  content: \`\n${text}\`,
};\n
export default css;\n
`;

async function read(path) {
  try {
    const content = await fs.readFileSync(path, 'utf-8');
    return content;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
}

async function write(path, content) {
  return await fs.writeFileSync(path, content);
}

async function remove(path) {
  fs.access(path, fs.constants.F_OK, err => {
    if (err) {
      console.error('Error:', err);
      return; // path doesn't exist
    }

    fs.unlink(path, err => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully:', path);
      }
    });
  });
}

async function convert(path) {
  const inputText = await read(path);
  const outputData = template(inputText, path);
  const writeResult = await write(cfg.outputPath(path), outputData);
  return writeResult;
}

function getExtension(path, stats) {
  if (!stats?.isFile()) return null;
  const parts = path.split('.');
  const l = parts.length;
  if (l < 2) return null;
  return parts[l - 1];
}

const hash = (str, seed = 0) => cyrb53(str, seed).toString(36);

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const cyrb53 = (str, seed = 0) => {
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

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function replaceExtension(path, ext) {
  const parts = path.split('.');
  parts.pop();
  parts.push(ext);
  return parts.join('.');
}
