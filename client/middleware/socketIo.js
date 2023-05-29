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
function documentsSocket(socket, io) {
  socket.on('a client choose a collection', async (data) => {
    const documents = await documentManager.fetchAllObjects(data.userId);
    const result = documents.filter((object) => object.collection === data.collection);
    const table = constructDocumentTable(result);
    io.emit('a collection was chosen', {
      currentCollection: templateEngine.readPage(currentcollection).replace('$CURRENT_COLLECTION', data.collection),
      table: table,
      content: templateEngine.readPage(contentmessage).replace('$CONTENT_MESSAGE', 'Choose a document...'),
    });
  });

  socket.on('a client choose create document', (data) => {
    const content = constructCreateDocument(data.collection);
    io.emit('a document is to be created', {
      content: content,
    });
  });

  socket.on('a client creates a document', async (data) => {
    await documentManager.postObject(data.collection, data.content, data.userId);
    const documents = await documentManager.fetchAllObjects(data.userId);
    const result = documents.filter((object) => object.collection === data.collection);
    const table = constructDocumentTable(result);
    io.emit('a document was created', {
      table: table,
      content: templateEngine.readPage(contentmessage).replace('$CONTENT_MESSAGE', 'A document was created...'),
    });
  });
  socket.on('a client choose a document', async (data) => {
    const document = await documentManager.fetchObjectById(data.id, data.userId);
    const content = constructDocumentContent(data.id, document);
    io.emit('a document was chosen', {
      content: content,
    });
  });
  socket.on('a client choose delete document', async (data) => {
    const id = data.id;
    const userId = data.userId;
    await documentManager.deleteObject(id, userId);
    const documents = await documentManager.fetchAllObjects(data.userId);
    const result = documents.filter((object) => object.collection === data.collection);
    const table = constructDocumentTable(result);
    io.emit('a document was deleted', {
      table: table,
    });
  });
  socket.on('a client choose update document', async (data) => {
    const id = data.id;
    const userId = data.userId;
    const document = await documentManager.fetchObjectById(id, userId);
    const content = constructUpdateContent(id, document);
    io.emit('a document was chosen to be updated', {
      content: content,
    });
  });
  socket.on('a client updates a document', async (data) => {
    await documentManager.updateObject(data.id, data.content, data.userId);
    const documents = await documentManager.fetchAllObjects(data.userId);
    const document = await documentManager.fetchObjectById(data.id, data.userId);
    const table = constructDocumentTable(documents);
    const content = constructDocumentContent(data.id, document);
    io.emit('a document was updated', {
      table: table,
      content: content,
    });
  });
}

function imagesSocket(socket, io) {
  socket.on('a client deletes an image', async (data) => {
    await imageManager.deleteObject(data.id, data.userId);
    await imageManager.deleteImageFile(data.fileName);
    io.emit('an image was deleted');
  });
}

function userSocket(socket, io) {
  socket.on('a client creates a category', (data) => {
    if (!data.name || !data.userId) {
      io.emit('a category had invalid values');
    } else {
      try {
        categoryManager.postObject(data.name, data.userId);
      } catch (err) {
        io.emit('an error occurred on the server');
      }
      io.emit('a category was created');
    }
  });

  socket.on('a client creates a collection', (data) => {
    if (!data.category || !data.name || !data.userId) {
      io.emit('a collection had invalid values');
    } else {
      collectionManager.postObject(data.category, data.name, data.userId);
      io.emit('a collection was created');
    }
  });

  socket.on('a client deletes a category', (data) => {
    categoryManager.deleteObject(data.id, data.userId);
    io.emit('a category was deleted');
  });

  socket.on('a client deletes a collection', (data) => {
    collectionManager.deleteObject(data.id, data.userId);
    io.emit('a collection was deleted');
  });
}
