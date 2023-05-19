import templateEngine from "../templateEngine.js";

export default function constructUpdateContent(id, document){
    const html = templateEngine.readPage('./views/partials/documents/update.html')
    .replace('$DOCUMENT_CONTENT', document.content)
    .replace('$DOCUMENT_CONTENT_ID', id)
    return html;
}