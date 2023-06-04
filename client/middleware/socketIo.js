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
import { constructCollectionList, generateCategoryOptions } from '../util/pages/constructUserPage.js';

function documentsSocket(socket, io) {
  socket.on('a client choose a collection', async (data) => {
    const userId = data.userId;
    const collection = data.collection;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const documents = await documentManager.fetchAllObjects(userId);
      const result = documents.filter((object) => object.collection === collection);
      const table = constructDocumentTable(result);
      io.emit('a collection was chosen', {
        currentCollection: templateEngine.readPage(currentcollection).replace('$CURRENT_COLLECTION', collection),
        table: table,
        content: templateEngine.readPage(contentmessage).replace('$CONTENT_MESSAGE', 'Choose a document...'),
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during retrieving a collection');
    }
  });
  socket.on('a client choose a document', async (data) => {
    const userId = data.userId;
    const id = data.id;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const document = await documentManager.fetchObjectById(id, userId);
      const content = constructDocumentContent(document);
      io.emit('a document was chosen', {
        content: content,
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during retrieving a document');
    }
  });
  socket.on('a client choose create document', (data) => {
    const collection = data.collection;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const content = constructCreateDocument(collection);
      io.emit('a document is to be created', {
        content: content,
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during retrieving document creation');
    }
  });
  socket.on('a client creates a document', async (data) => {
    const userId = data.userId;
    const collection = data.collection;
    const content = data.content;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const postedDocument = await documentManager.postObject(collection, content, userId);
      const documents = await documentManager.fetchAllObjects(userId);
      const filteredDocuments = documents.filter((object) => object.collection === collection);
      const tableHtml = constructDocumentTable(filteredDocuments);
      const contentHtml = constructDocumentContent(postedDocument);
      io.emit('a document was created', {
        table: tableHtml,
        content: contentHtml,
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during document creation');
    }
  });
  socket.on('a client choose delete document', async (data) => {
    const id = data.id;
    const userId = data.userId;
    const collection = data.collection;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const deletedDocument = await documentManager.deleteObject(id, userId);
      const documents = await documentManager.fetchAllObjectsByCollection(userId, collection);
      const table = constructDocumentTable(documents);
      const content = constructDeletedDocumentContent(deletedDocument);
      io.emit('a document was deleted', {
        table: table,
        content: content,
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during document deletion');
    }
  });
  socket.on('a client choose update document', async (data) => {
    const id = data.id;
    const userId = data.userId;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const document = await documentManager.fetchObjectById(id, userId);
      const content = constructUpdateContent(document);
      io.emit('a document was chosen to be updated', {
        content: content,
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during retrieving document updating');
    }
  });
  socket.on('a client updates a document', async (data) => {
    const id = data.id;
    const userId = data.userId;
    const content = data.content;
    const collection = data.collection;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const updatedDocument = await documentManager.updateObject(id, content, userId);
      const documents = await documentManager.fetchAllObjectsByCollection(userId, collection);
      const document = await documentManager.fetchObjectById(id, userId);
      const tableHtml = constructDocumentTable(documents);
      const contentHtml = constructDocumentContent(document);
      io.emit('a document was updated', {
        table: tableHtml,
        content: contentHtml,
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during document updating');
    }
  });
}
function imagesSocket(socket, io) {
  socket.on('a client deletes an image', async (data) => {
    const userId = data.userId;
    const id = data.id;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const deletedImage = await imageManager.deleteObject(id, userId);
      imageManager.deleteImageFile(data.fileName);
      io.emit('an image was deleted');
    } catch (err) {
      console.error('ERROR: ', err);
      io.emit('an error occurred during category creation');
    }
  });
}
function userSocket(socket, io) {
  async function updateHtml(userId) {
    const categories = await categoryManager.fetchAllObjects(userId);
    const collections = await collectionManager.fetchAllObjects(userId);
    const documents = await documentManager.fetchAllObjects(userId);
    const categoryOptions = generateCategoryOptions(categories);
    const categoryList = constructCollectionList(categories, collections, documents);
    return { categoryList: categoryList, categoryOptions: categoryOptions };
  }
  socket.on('a client creates a category', async (data) => {
    const userId = data.userId;
    const name = data.name;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    if (!name) {
      io.emit('a category had invalid values');
      return;
    }
    try {
      const postedCategory = await categoryManager.postObject(name, userId);
      const updatedCategories = await updateHtml(userId);
      io.emit('a category was created', {
        categoryOptions: updatedCategories.categoryOptions,
        categoryList: updatedCategories.categoryList,
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during category creation');
    }
  });
  socket.on('a client deletes a category', async (data) => {
    const userId = data.userId;
    const id = data.id;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const collections = await collectionManager.fetchAllObjects(userId);
      const matchingCollections = collections.filter((object) => object.category === id);
      if (matchingCollections.length === 0) {
        const deletedCategory = await categoryManager.deleteObject(id, userId);
        const updatedCategories = await updateHtml(userId);
        io.emit('a category was deleted', {
          categoryOptions: updatedCategories.categoryOptions,
          categoryList: updatedCategories.categoryList,
        });
      } else {
        io.emit('a category with collections was tried to be deleted');
      }
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during category deletion');
    }
  });
  socket.on('a client creates a collection', async (data) => {
    const userId = data.userId;
    const category = data.category;
    const name = data.name;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    if (!category || !name) {
      io.emit('a collection had invalid values');
      return;
    }
    try {
      const postedCollection = await collectionManager.postObject(data.category, data.name, data.userId);
      const updatedCategories = await updateHtml(userId);
      io.emit('a collection was created', {
        categoryOptions: updatedCategories.categoryOptions,
        categoryList: updatedCategories.categoryList,
      });
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during collection creation');
    }
  });
  socket.on('a client deletes a collection', async (data) => {
    const userId = data.userId;
    const id = data.id;
    if (!userId) {
      io.emit('a client is not logged in');
      return;
    }
    try {
      const documents = await documentManager.fetchAllObjects(userId);
      const images = await imageManager.fetchAllObjects(userId);
      const matchingDocuments = documents.filter((object) => object.collection === id);
      const matchingImages = images.filter((object) => object.collection === id);
      if (matchingDocuments.length === 0 && matchingImages.length === 0) {
        const deletedCollection = await collectionManager.deleteObject(id, userId);
        const updatedCategories = await updateHtml(userId);
        io.emit('a collection was deleted', {
          categoryOptions: updatedCategories.categoryOptions,
          categoryList: updatedCategories.categoryList,
        });
      } else {
        io.emit('a collection with documents was tried to be deleted', {
          images: matchingImages.length,
          documents: matchingDocuments.length,
        });
      }
    } catch (err) {
      console.error('ERROR:', err);
      io.emit('an error occurred during collection deletion');
    }
  });
}
