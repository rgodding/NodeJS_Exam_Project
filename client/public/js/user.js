const socket = io();
const documentPicker = document.getElementById('document-picker');
const documentName = document.getElementById('documents-table-name');

function createCollectionType() {
  const name = document.getElementById('collectiontypename').value;
  const type = document.getElementById('collectiontypetype').value;
  const userId = document.getElementById('userid').value;
  socket.emit('a client creates a collection category', { name: name, type: type, userId: userId });
}

function createCollection() {
  const name = document.getElementById('collectionname').value;
  const type = document.getElementById('collectiontype').value;
  const category = document.getElementById('collectioncategory').value;
  const userId = document.getElementById('userid').value;
  socket.emit('a client creates a collection', { category: category, name: name, type: type, userId: userId });
}

socket.on('a collection was created', (data) => {
  window.location.reload();
});

socket.on('a collection category was created', (data) => {
  window.location.reload();
});


function deleteCollection(id) {
  if (confirm('Are you sure you want to delete the collection?')) {
    const userId = document.getElementById('userid').value;
    socket.emit('a client deletes a collection', { id: id, userId: userId });
  }
}

function deleteCollectionType(id) {
  if (confirm('Are you sure you want to delete the collection category?')) {
    const userId = document.getElementById('userid').value;
    socket.emit('a client deletes a collection category', { id: id, userId: userId });
  }
}

socket.on('a collection was deleted', (data) => {
  window.location.reload();
});

socket.on('a collection category was deleted', (data) => {
  window.location.reload();
});

socket.on('a category was missing values', (data) => {
  console.log('No values');
})
socket.on('a collection was missing values', (data) => {
  console.log('No values');
})