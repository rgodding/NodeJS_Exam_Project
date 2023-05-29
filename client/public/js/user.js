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
function checkCollectionInputs(){
  var collectionNameValue = collectionNameInput.value;
  var collectionCategoryValue = collectionCategoryInput.value;
  if (collectionNameValue !== '' && collectionCategoryValue !== '') {
    collectionCreateButton.disabled = false;
  } else {
    collectionCreateButton.disabled = true;
  }
}
function createCategory() {
  const name = document.getElementById('categoryname').value;
  const userId = document.getElementById('userid').value;
  socket.emit('a client creates a category', { name: name, userId: userId });
}
socket.on('a category was created', (data) => {
  window.location.reload();
});
socket.on('a category had invalid values', (data) => {
  console.log('No values');
});

function createCollection() {
  const name = document.getElementById('collectionname').value;
  const category = document.getElementById('collectioncategory').value;
  const userId = document.getElementById('userid').value;
  socket.emit('a client creates a collection', { category: category, name: name, userId: userId });
}
socket.on('a collection was created', (data) => {
  window.location.reload();
});
socket.on('a collection had invalid values', (data) => {
  console.log('No values');
});


function deleteCollection(id) {
  if (confirm('Are you sure you want to delete the collection?')) {
    const userId = document.getElementById('userid').value;
    socket.emit('a client deletes a collection', { id: id, userId: userId });
  }
}
function deleteCategory(id) {
  if (confirm('Are you sure you want to delete the category?')) {
    const userId = document.getElementById('userid').value;
    socket.emit('a client deletes a category', { 
      id: id, 
      userId: userId 
    });
  }
}
socket.on('a collection was deleted', (data) => {
  window.location.reload();
});
socket.on('a category was deleted', (data) => {
  window.location.reload();
});
socket.on('a category had invalid values', (data) => {
  console.log('No values');
});
socket.on('a collection had invalid values', (data) => {
  console.log('No values');
});
