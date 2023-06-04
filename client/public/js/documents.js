const socket = io();
const documentPicker = document.getElementById('document-picker');
const documentName = document.getElementById('documents-table-name');
const documentTable = document.getElementById('documents-table-items-field');
const documentContent = document.getElementById('documents-content-field');
const documentCreateButton = document.getElementById('document-create-button');
const documentCollection = document.getElementById('current-collection');

async function pickCollection(collection) {
  loading();
  const userId = await fetchUserId();
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
  highLightCode();
  finishLoading();
});

function pickCreateDocument() {
  loading();
  const collection = document.getElementById('current-collection-value').value;
  socket.emit('a client choose create document', {
    collection: collection,
  });
}

socket.on('a document is to be created', (data) => {
  documentContent.innerHTML = data.content;
  finishLoading();
});

async function postCreateDocument() {
  loading();
  const userId = await fetchUserId();
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
  highLightCode();
  finishLoading();
});

async function pickDocument(id) {
  loading();
  const userId = await fetchUserId();
  socket.emit('a client choose a document', {
    id: id,
    userId: userId,
  });
}

socket.on('a document was chosen', (data) => {
  documentContent.innerHTML = data.content;
  highLightCode();
  finishLoading();
});

async function deleteDocument(collection, id) {
  if (confirm('Are you sure you want to delete the document')) {
    loading();
    const userId = await fetchUserId();
    socket.emit('a client choose delete document', {
      userId: userId,
      id: id,
      collection: collection,
    });
  }
}

socket.on('a document was deleted', (data) => {
  documentTable.innerHTML = data.table;
  documentContent.innerHTML = data.content;
  finishLoading();
});

async function updateDocument(collection, id) {
  loading();
  const userId = await fetchUserId();
  socket.emit('a client choose update document', {
    userId: userId,
    id: id,
    collection: collection,
  });
}

socket.on('a document was chosen to be updated', (data) => {
  documentContent.innerHTML = data.content;
  finishLoading();
});

async function postUpdateDocument(id, collection) {
  loading();
  const userId = await fetchUserId();
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
  highLightCode();
  finishLoading();
});

function loading() {
  var loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'flex';
}

function finishLoading() {
  var loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'none';
}

function highLightCode() {
  setTimeout(() => {
    Prism.highlightAll();
  }, 1);
}

socket.on('a client is not logged in', () => {
  alert('You were logged out, please login again');
  window.location.href = '/login';
});
