const socket = io();
const userId = document.getElementById('userid').value;
const documentPicker = document.getElementById('document-picker');
const documentName = document.getElementById('documents-table-name');
const documentTable = document.getElementById('documents-table-items-field');
const documentContent = document.getElementById('documents-content-field');
const documentCreateButton = document.getElementById('document-create-button');
const documentCollection = document.getElementById('current-collection');

function pickCollection(collection) {
  socket.emit('a client choose a collection', {
    collection: collection,
    userId: userId,
  });
}
socket.on('a collection was chosen', (data) => {
  documentCollection.innerHTML = data.currentCollection;
  documentCreateButton.classList.remove('disabled');
  documentTable.innerHTML = data.table;
  documentContent.innerHTML = data.content;
});
function pickCreateDocument() {
  const collection = document.getElementById('current-collection-value').value;
  socket.emit('a client choose create document', {
    collection: collection,
  });
}
socket.on('a document is to be created', (data) => {
  documentContent.innerHTML = data.content;
});
function postCreateDocument() {
  const collection = document.getElementById('documenttype').value;
  const content = document.getElementById('documentinput').value;
  socket.emit('a client creates a document', {
    collection: collection,
    content: content,
    userId: userId,
  });
}
socket.on('a document was created', (data) => {
  documentTable.innerHTML = data.table;
  documentContent.innerHTML = data.content;
});
function pickDocument(id) {
  socket.emit('a client choose a document', {
    id: id,
    userId: userId,
  });
}
socket.on('a document was chosen', (data) => {
  documentContent.innerHTML = data.content;
});
function deleteDocument(collection, id) {
  if (confirm('Are you sure you want to delete the document')) {
    socket.emit('a client choose delete document', {
      id: id,
      userId: userId,
      collection: collection,
    });
  }
}
socket.on('a document was deleted', (data) => {
  documentTable.innerHTML = data.table;
  documentContent.innerHTML = data.content;
});
function updateDocument(collection, id) {
  socket.emit('a client choose update document', {
    id: id,
    userId: userId,
    collection: collection,
  });
}
socket.on('a document was chosen to be updated', (data) => {
  documentContent.innerHTML = data.content;
});
function postUpdateDocument(id, collection) {
  const content = document.getElementById('documentinput').value;
  socket.emit('a client updates a document', {
    id: id,
    userId: userId,
    content: content,
    collection: collection,
  });
}
socket.on('a document was updated', (data) => {
  documentTable.innerHTML = data.table;
  documentContent.innerHTML = data.content;
});