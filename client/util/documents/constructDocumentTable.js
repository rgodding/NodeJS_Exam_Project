import templateEngine from "../templateEngine.js";

export default function constructDocumentTable(documents) {
  let html = '';
  documents.forEach((document) => {
    html += templateEngine.readPage('./views/partials/documents/tableitem.html')
    .replace('$DOCUMENT_TABLE_ITEM_NAME', document.name)
    .replace('$TABLE_ITEM_ID', document.id);
  });
  return html;
}
