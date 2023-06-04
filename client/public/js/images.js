const socket = io();

function uploadImage() {
  var fileInput = document.getElementsByName('file')[0];
  var nameInput = document.getElementsByName('name')[0];
  var descriptionInput = document.getElementsByName('description')[0];
  if (fileInput.value === '' || nameInput.value === '' || descriptionInput.value === '') {
    alert('Please fill in all required fields.');
    return false;
  } else {
    alert('Image uploaded');
    window.location.reload();
  }
}

async function deleteImage(id, fileName) {
  if (confirm('Are you sure you want to delete the document')) {
    const userId = await fetchUserId();
    socket.emit('a client deletes an image', { id: id, fileName: fileName, userId: userId });
  }
}

socket.on('an image was deleted', (data) => {
  window.location.reload();
});
