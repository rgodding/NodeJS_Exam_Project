import readMarkdownToHtml from '../readMarkdownToHtml.js';
import templateEngine from '../templateEngine.js';

export default function constructDeletedDocumentContent(document) {
  const html = templateEngine.readPage('./views/partials/documents/deleteddocumentcontent.html')
  .replace('$DOCUMENT_NAME', document.name)
  .replace('$DOCUMENT_ID', document.id)
  .replace('$DOCUMENT_CONTENT', document.content);
  return html;
}