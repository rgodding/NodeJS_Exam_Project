import readMarkdownToHtml from "../readMarkdownToHtml.js";
import templateEngine from "../templateEngine.js";

export default function constructDocumentContent(collection, id, document){
    const content = readMarkdownToHtml(document.content)
    const html = templateEngine.readPage('./views/partials/documents/content.html')
    .replace('$DOCUMENT_CONTENT', content)
    .replace('$DOCUMENT_CONTENT_ID', id)
    .replace('$DOCUMENT_CONTENT_COLLECTION', collection)
    return html;
}