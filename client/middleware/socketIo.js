import templateEngine from '../util/templateEngine.js';

import categoryManager from '../repository/categoryManager.js';
import collectionManager from '../repository/collectionManager.js';
import documentManager from '../repository/documentManager.js';
import constructDocumentTable from '../util/documents/constructDocumentTable.js';
import constructCreateDocument from '../util/documents/constructCreateDocument.js';
import constructDocumentContent from '../util/documents/constructDocumentContent.js';
import constructUpdateContent from '../util/documents/constructUpdateDocument.js';
import imageManager from '../repository/imageManager.js';

export default function socketIo(io) {
  io.on('connection', (socket) => {
    console.log('A client connected', socket.id);
    documentsSocket(socket, io);
    imagesSocket(socket, io);
    userSocket(socket, io);
  });
}
import { contentmessage, currentcollection } from '../constants/partials/documentsPagePartialPaths.js';
import constructDeletedDocumentContent from '../util/documents/constructDeletedDocumentContent.js';

function documentsSocket(socket, io) {
  socket.on('a client choose a collection', async (data) => {
    const userId = data.userId;
    const collection = data.collection;
    const documents = await documentManager.fetchAllObjects(userId);
    const result = documents.filter((object) => object.collection === collection);
    const table = constructDocumentTable(result);
    io.emit('a collection was chosen', {
      currentCollection: templateEngine.readPage(currentcollection).replace('$CURRENT_COLLECTION', collection),
      table: table,
      content: templateEngine.readPage(contentmessage).replace('$CONTENT_MESSAGE', 'Choose a document...'),
    });
  });
  socket.on('a client choose a document', async (data) => {
    const userId = data.userId;
    const id = data.id;
    const document = await documentManager.fetchObjectById(id, userId);
    const content = constructDocumentContent(document);
    io.emit('a document was chosen', {
      content: content,
    });
  });
  socket.on('a client choose create document', (data) => {
    const collection = data.collection;
    const content = constructCreateDocument(collection);
    io.emit('a document is to be created', {
      content: content,
    });
  });
  socket.on('a client creates a document', async (data) => {
    const userId = data.userId;
    const collection = data.collection;
    const content = data.content;
    const postedDocument = await documentManager.postObject(collection, content, userId);
    postDocument(postedDocument).then(async () => {
      const documents = await documentManager.fetchAllObjects(userId);
      const filteredDocuments = documents.filter((object) => object.collection === collection)
      const table = constructDocumentTable(filteredDocuments);
      const content = constructDocumentContent(postedDocument);
      io.emit('a document was created', {
        table: table,
        content: content,
      });
    });
  });
  socket.on('a client choose delete document', async (data) => {
    const id = data.id;
    const userId = data.userId;
    const collection = data.collection;
    const deletedDocument = await documentManager.deleteObject(id, userId);
    deleteDocument(deletedDocument).then(async () => {
      const documents = await documentManager.fetchAllObjectsByCollection(userId, collection);
      const table = constructDocumentTable(documents);
      const content = constructDeletedDocumentContent(deletedDocument);
      io.emit('a document was deleted', {
        table: table,
        content: content,
      });
    });
  });
  socket.on('a client choose update document', async (data) => {
    const id = data.id;
    const userId = data.userId;
    const document = await documentManager.fetchObjectById(id, userId);
    const content = constructUpdateContent(document);
    io.emit('a document was chosen to be updated', {
      content: content,
    });
  });
  socket.on('a client updates a document', async (data) => {
    const id = data.id;
    const userId = data.userId;
    const content = data.content;
    const collection = data.collection;
    const updatedDocument = await documentManager.updateObject(id, content, userId);
    updateDocument(updatedDocument).then(async () => {
      const documents = await documentManager.fetchAllObjectsByCollection(userId, collection);
      const document = await documentManager.fetchObjectById(id, userId);
      const tableHtml = constructDocumentTable(documents);
      const contentHtml = constructDocumentContent(document);
      io.emit('a document was updated', {
        table: tableHtml,
        content: contentHtml,
      });
    });
  });
}
function imagesSocket(socket, io) {
  socket.on('a client deletes an image', async (data) => {
    const userId = data.userId;
    const id = data.id;
    const deletedImage = await imageManager.deleteObject(id, userId);
    deleteImage(deletedImage).then(() => {
      imageManager.deleteImageFile(data.fileName);
    });
    io.emit('an image was deleted');
  });
}
function userSocket(socket, io) {
  socket.on('a client creates a category', async (data) => {
    const userId = data.userId;
    const name = data.name;
    if (!userId) {
      io.emit('a client is not logged in');
    } else if (!name) {
      io.emit('a category had invalid values');
    } else {
      try {
        const postedCategory = await categoryManager.postObject(name, userId);
        io.emit('a category was created');
      } catch(err){
        console.error('ERROR:', err);
        io.emit('an error occurred during category creation');
      }
      
    }
  });

  socket.on('a client deletes a category', async (data) => {
    const userId = data.userId;
    const id = data.id;
    if(!userId){
      io.emit('a client is not logged in');
    }
    const collections = await collectionManager.fetchAllObjects(userId);
    const matchingCollections = collections.filter((object) => object.category === id);
    if (matchingCollections.length === 0) {
      const deletedCategory = await categoryManager.deleteObject(id, userId);
      deleteCategory(deletedCategory).then(async () => {
        const categories = await categoryManager.fetchAllObjects(userId);
        io.emit('a category was deleted', { categories: categories});
      });
    } else {
      io.emit('a category with collections was tried to be deleted');
    }
  });
  socket.on('a client creates a collection', async (data) => {
    const userId = data.userId;
    const category = data.category;
    const name = data.name;
    if (!category || !name || !userId) {
      io.emit('a collection had invalid values');
    } else {
      const postedCollection = await collectionManager.postObject(data.category, data.name, data.userId);
      postCollection(postedCollection).then(() => {
        io.emit('a collection was created');
      });
    }
  });
  socket.on('a client deletes a collection', async (data) => {
    const userId = data.userId;
    const id = data.id;
    const documents = await documentManager.fetchAllObjects(userId);
    const images = await imageManager.fetchAllObjects(userId);
    const matchingDocuments = documents.filter((object) => object.collection === id);
    const matchingImages = images.filter((object) => object.collection === id);
    if (matchingDocuments.length === 0 && matchingImages.length === 0) {
      const deletedCollection = await collectionManager.deleteObject(id, userId);
      deleteCollection(deletedCollection).then(() => {
        io.emit('a collection was deleted');
      });
    } else {
      io.emit('a collection with documents was tried to be deleted', {
        images: matchingImages.length,
        documents: matchingDocuments.length,
      });
    }
  });
}
