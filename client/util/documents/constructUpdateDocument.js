import templateEngine from '../templateEngine.js';

export default function constructUpdateContent(document) {
  const html = templateEngine.readPage('./views/partials/documents/update.html')
  .replace('$DOCUMENT_CONTENT', document.content)
  .replace('$DOCUMENT_ID', document.id)
  .replace('$DOCUMENT_COLLECTION', document.collection);
  return html;
}
