import readMarkdownToHtml from '../readMarkdownToHtml.js';
import templateEngine from '../templateEngine.js';

export default function constructDocumentContent(document) {
  const html = templateEngine.readPage('./views/partials/documents/content.html')
  .replace('$DOCUMENT_CONTENT', readMarkdownToHtml(document.content))
  .replace('$DOCUMENT_CONTENT_ID_UPDATE', document.id)
  .replace('$DOCUMENT_CONTENT_COLLECTION_UPDATE', document.collection)
  .replace('$DOCUMENT_CONTENT_ID_DELETE', document.id)
  .replace('$DOCUMENT_CONTENT_COLLECTION_DELETE', document.collection);
  return html;
}