import { marked } from './node_modules/marked/lib/marked.esm.js';

export function markdownToHtml(text) {
  return marked.parse(text, { gfm: true, breaks: false });
}
