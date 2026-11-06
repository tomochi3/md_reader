import test from 'node:test';
import assert from 'node:assert/strict';
import { markdownToHtml } from './render.js';

test('renders headings, lists, fenced code and GFM tables', () => {
  const html = markdownToHtml('# Hello\n\n- item\n\n```js\nconst x = 1;\n```\n\n| A | B |\n| - | - |\n| 1 | 2 |');
  for (const expected of ['<h1>Hello</h1>', '<li>item</li>', 'language-js', '<table>', '<td>2</td>']) assert.ok(html.includes(expected), expected);
});

test('supports empty and Japanese documents', () => {
  assert.equal(markdownToHtml(''), '');
  assert.match(markdownToHtml('## 読書\n\n**太字**'), /<strong>太字<\/strong>/);
});
