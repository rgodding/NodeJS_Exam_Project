import templateEngine from "../templateEngine.js";

export default function constructCreateDocument(collection){
    const html = templateEngine.readPage('./views/partials/documents/create.html')
    .replace('$DOCUMENT_CONTENT', '')
    .replace('$DOCUMENT_CONTENT_COLLECTION', collection)
    return html;
}