import categoryManager from '../repository/categoryManager.js';
import collectionManager from '../repository/collectionManager.js';
import constructUserPage from '../util/pages/constructUserPage.js';

export async function showUser(req, res) {
  try {
    const userId = req.userId;
    const categories = await categoryManager.fetchAllObjects(userId);
    const collections = await collectionManager.fetchAllObjects(userId);
    const page = await constructUserPage(req.isUser, userId, categories, collections);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
