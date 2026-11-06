import DOMPurify from './node_modules/dompurify/dist/purify.es.mjs';
import { markdownToHtml } from './render.js';

const $ = (id) => document.getElementById(id);
const input = $('file');
let request = 0;
async function openFile(file) {
  if (!file) return;
  const current = ++request;
  if (!/\.(md|markdown)$/i.test(file.name)) {
    $('status').textContent = '.md または .markdown ファイルを選択してください。';
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    $('status').textContent = '10 MB 以下のファイルを選択してください。';
    return;
  }
  try {
    const text = await file.text();
    if (current !== request) return;
    $('content').innerHTML = DOMPurify.sanitize(markdownToHtml(text), {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['img', 'video', 'audio', 'source', 'style', 'form', 'input', 'button'],
      FORBID_ATTR: ['style', 'srcset'],
    });
    for (const link of $('content').querySelectorAll('a')) {
      const href = link.getAttribute('href') || '';
      if (!/^(https?:\/\/|mailto:|#)/i.test(href)) link.removeAttribute('href');
      if (/^https?:\/\//i.test(href)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    }
    $('filename').textContent = file.name;
    $('reader').hidden = false;
    $('drop').hidden = true;
    $('status').textContent = text.trim() ? '' : 'このファイルは空です。';
  } catch {
    if (current === request) $('status').textContent = 'ファイルを読み取れませんでした。もう一度お試しください。';
  }
}
$('open').onclick = () => input.click();
$('drop').onclick = () => input.click();
$('drop').onkeydown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.click(); }
};
input.onchange = () => { openFile(input.files[0]); input.value = ''; };
for (const name of ['dragenter', 'dragover']) {
  $('drop').addEventListener(name, (event) => { event.preventDefault(); $('drop').classList.add('dragging'); });
}
$('drop').ondragleave = () => $('drop').classList.remove('dragging');
$('drop').ondrop = (event) => {
  event.preventDefault(); $('drop').classList.remove('dragging'); openFile(event.dataTransfer.files[0]);
};
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());
$('close').onclick = () => {
  request++; $('reader').hidden = true; $('content').replaceChildren(); $('drop').hidden = false; $('status').textContent = ''; $('drop').focus();
};
