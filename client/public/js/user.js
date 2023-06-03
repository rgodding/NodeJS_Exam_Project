const socket = io();

var categoryNameInput = document.getElementById('categoryname');

var collectionNameInput = document.getElementById('collectionname');
var collectionCategoryInput = document.getElementById('collectioncategory');

var categoryCreateButton = document.getElementById('categoryCreateButton');
var collectionCreateButton = document.getElementById('collectionCreateButton');

categoryNameInput.addEventListener('input', checkCategoryInputs);

collectionNameInput.addEventListener('input', checkCollectionInputs);
collectionCategoryInput.addEventListener('input', checkCollectionInputs);

function checkCategoryInputs() {
  var categoryNameValue = categoryNameInput.value;
  if (categoryNameValue !== '') {
    categoryCreateButton.disabled = false;
  } else {
    categoryCreateButton.disabled = true;
  }
}
function checkCollectionInputs() {
  var collectionNameValue = collectionNameInput.value;
  var collectionCategoryValue = collectionCategoryInput.value;
  if (collectionNameValue !== '' && collectionCategoryValue !== '') {
    collectionCreateButton.disabled = false;
  } else {
    collectionCreateButton.disabled = true;
  }
}

function createCategory() {
  loading();
  const name = document.getElementById('categoryname').value;
  const userId = document.getElementById('userid').value;
  socket.emit('a client creates a category', { name: name, userId: userId });
}
socket.on('a category was created', (data) => {
  window.location.reload();
});
socket.on('a category had invalid values', (data) => {
  alert('Invalid values');
});

function createCollection() {
  loading();
  const name = document.getElementById('collectionname').value;
  const category = document.getElementById('collectioncategory').value;
  const userId = document.getElementById('userid').value;
  socket.emit('a client creates a collection', { category: category, name: name, userId: userId });
}
socket.on('a collection was created', (data) => {
  window.location.reload();
});
socket.on('a collection had invalid values', (data) => {
  alert('Invalid values');
});

function deleteCollection(id) {
  if (confirm('Are you sure you want to delete the collection?')) {
    loading();
    const userId = document.getElementById('userid').value;
    socket.emit('a client deletes a collection', { id: id, userId: userId });
  }
}
socket.on('a collection had invalid values', () => {
  alert('Invalid values');
});
socket.on('a collection was deleted', () => {
  window.location.reload();
});
socket.on('a collection with documents was tried to be deleted', (data) => {
  alert(`Please delete all documents and images in the collection to continue - Documents (${data.documents}), Images (${data.images})`);
});

function deleteCategory(id) {
  if (confirm('Are you sure you want to delete the category?')) {
    loading();
    const userId = document.getElementById('userid').value;
    socket.emit('a client deletes a category', {
      id: id,
      userId: userId,
    });
  }
}
socket.on('a category was deleted', () => {
  window.location.reload();
});
socket.on('a category with collections was tried to be deleted', () => {
  alert('Please delete all collections in the category to continue');
});
socket.on('a category had invalid values', () => {
  alert('Invalid values');
});

function loading() {
  var loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'flex';
}
