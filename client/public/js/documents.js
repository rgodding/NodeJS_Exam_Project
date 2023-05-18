const socket = io();
const userId = document.getElementById('userid').value;
const documentPicker = document.getElementById("document-picker");
const documentName = document.getElementById("documents-table-name")
const documentTable = document.getElementById("documents-table-items-field")
const documentContent = document.getElementById("documents-content-field")
const documentCreateButton = document.getElementById("document-create-button")
const documentCollection = document.getElementById('current-collection');

function pickCollection(collection) {
    socket.emit("a client choose a collection", { 
        collection: collection, 
        userId: userId
    })
}
socket.on("a collection was chosen", (data) => {
    documentCollection.innerHTML = data.currentCollection;
    documentCreateButton.classList.remove('disabled')
    documentTable.innerHTML = data.table;
    documentContent.innerHTML = data.content;
})
function pickCreateDocument(){
    const collection = document.getElementById('current-collection-value').value
    socket.emit("a client choose create document", { 
        collection: collection
    })
}
socket.on("a document is to be created", (data) => {
    documentContent.innerHTML = data.content;
})
function postCreateDocument(){
    const collection = document.getElementById('documenttype').value;
    const content = document.getElementById('documentinput').value;
    socket.emit('a client creates a document', { 
        collection: collection,
        content: content,
        userId: userId
    });
}
socket.on("a document was created", (data) => {
    documentTable.innerHTML = data.table;
    documentContent.innerHTML = data.content;
})
function pickDocument(collection, id) {
    socket.emit("a client choose a document", { 
        collection: collection, 
        id: id,
        userId: userId
    });
}
socket.on("a document was chosen", (data) => {
    documentContent.innerHTML = data.content;
});
function deleteDocument(id){
    socket.emit("a client choose delete document", {
        id: id,
        userId: userId,
    })
}
socket.on("a document was deleted", (data) => {
    documentTable.innerHTML = data.table;
    documentContent.innerHTML = `<div class="container-fluid mt-3"><h3>Document was deleted</h3></div>`
})
function updateDocument(){
    socket.emit("a client choose update document", {
        id: id,
        userId: userId,
    })
}