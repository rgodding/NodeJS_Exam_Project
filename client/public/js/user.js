const socket = io();

const categoryNameInput = document.getElementById('categoryname');
const collectionNameInput = document.getElementById('collectionname');
const collectionCategoryInput = document.getElementById('collectioncategory');
const categoryCreateButton = document.getElementById('categoryCreateButton');
const collectionCreateButton = document.getElementById('collectionCreateButton');
categoryNameInput.addEventListener('input', checkCategoryInputs);
collectionNameInput.addEventListener('input', checkCollectionInputs);
collectionCategoryInput.addEventListener('input', checkCollectionInputs);

const categoryOptions = document.getElementById('collectioncategory');
const categoryList = document.getElementById('collections-list');
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
  if (collectionNameValue !== '' || collectionCategoryValue !== '') {
    collectionCreateButton.disabled = false;
  } else {
    collectionCreateButton.disabled = true;
  }
}

async function createCategory() {
  loading();
  const userId = await fetchUserId();
  const name = document.getElementById('categoryname').value;
  socket.emit('a client creates a category', { name: name, userId: userId });
}

socket.on('a category was created', (data) => {
  categoryOptions.innerHTML = data.categoryOptions;
  categoryList.innerHTML = data.categoryList;
  categoryNameInput.value = '';
  categoryCreateButton.disabled = true;
  finishLoading();
});

socket.on('a category had invalid values', () => {
  alert('Invalid values');
  finishLoading();
});

async function createCollection() {
  loading();
  const userId = await fetchUserId();
  const name = document.getElementById('collectionname').value;
  const category = document.getElementById('collectioncategory').value;
  socket.emit('a client creates a collection', { category: category, name: name, userId: userId });
}

socket.on('a collection was created', (data) => {
  categoryOptions.innerHTML = data.categoryOptions;
  categoryList.innerHTML = data.categoryList;
  collectionNameInput.value = '';
  collectionCreateButton.disabled = true;
  finishLoading();
});

socket.on('a collection had invalid values', () => {
  alert('Invalid values');
  finishLoading();
});

async function deleteCollection(id) {
  if (confirm('Are you sure you want to delete the collection?')) {
    loading();
    const userId = await fetchUserId();
    socket.emit('a client deletes a collection', { id: id, userId: userId });
  }
}

socket.on('a collection had invalid values', () => {
  alert('Invalid values');
  finishLoading();
});

socket.on('a collection was deleted', (data) => {
  categoryOptions.innerHTML = data.categoryOptions;
  categoryList.innerHTML = data.categoryList;
  finishLoading();
});

socket.on('a collection with documents was tried to be deleted', (data) => {
  alert(`Please delete all documents and images in the collection to continue - Documents (${data.documents}), Images (${data.images})`);
  finishLoading();
});

async function deleteCategory(id) {
  if (confirm('Are you sure you want to delete the category?')) {
    loading();
    socket.emit('a client deletes a category', {
      id: id,
      userId: await fetchUserId(),
    });
  }
}

socket.on('a category was deleted', (data) => {
  categoryOptions.innerHTML = data.categoryOptions;
  categoryList.innerHTML = data.categoryList;
  finishLoading();
});

socket.on('a category with collections was tried to be deleted', () => {
  alert('Please delete all collections in the category to continue');
  finishLoading();
});

socket.on('a category had invalid values', () => {
  alert('Invalid Values');
  finishLoading();
});

socket.on('a client is not logged in', () => {
  alert('You were logged out, please login again');
  window.location.href = '/login';
});

function loading() {
  var loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'flex';
}

function finishLoading() {
  var loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'none';
}