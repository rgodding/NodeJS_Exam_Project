import categoryManager from '../repository/categoryManager.js';
import collectionManager from '../repository/collectionManager.js';
import constructDocumentsPage from '../util/pages/constructDocumentsPage.js';

export async function showDocuments(req, res) {
  try {
    const userId = req.userId;
    const categories = await categoryManager.fetchAllObjects(userId);
    const collections = await collectionManager.fetchAllObjects(userId);
    const page = constructDocumentsPage(req.isUser, categories, collections);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
