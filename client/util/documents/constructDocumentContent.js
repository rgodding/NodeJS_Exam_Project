import readMarkdownToHtml from '../readMarkdownToHtml.js';
import templateEngine from '../templateEngine.js';

export default function constructDocumentContent(id, document) {
  const content = readMarkdownToHtml(document.content);
  const html = templateEngine.readPage('./views/partials/documents/content.html')
  .replace('$DOCUMENT_CONTENT', content).replace('$DOCUMENT_CONTENT_ID_UPDATE', id)
  .replace('$DOCUMENT_CONTENT_ID_DELETE', id)
  .replace('$DOCUMENT_CONTENT_COLLECTION_DELETE', document.collection);
  return html;
}
