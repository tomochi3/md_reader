import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';

const result = await build({ entryPoints: ['app.js'], bundle: true, write: false, format: 'iife', minify: true, legalComments: 'inline' });
const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const css = await readFile('style.css', 'utf8');
const html = (await readFile('index.template.html', 'utf8'))
  .replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`)
  .replace('<script type="module" src="app.js"></script>', () => `<script>${js}</script>`);
await writeFile('md-reader.html', html);
await writeFile('index.html', html);
console.log('Built md-reader.html — open directly in a browser.');
