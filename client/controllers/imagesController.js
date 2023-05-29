import categoryManager from '../repository/categoryManager.js';
import collectionManager from '../repository/collectionManager.js';
import imageManager from '../repository/imageManager.js';
import constructImagesPage from '../util/pages/constructImagesPage.js';

export async function showImages(req, res) {
  try {
    const userId = req.userId;
    const categories = await categoryManager.fetchAllObjects(userId);
    const collections = await collectionManager.fetchAllObjects(userId);
    const images = await imageManager.fetchAllObjects(userId);
    const page = constructImagesPage(req.isUser, userId, categories, collections, images);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}

export function createImage(req, res) {
  try {
    const userId = req.session.userId;
    const type = req.body.type;
    const name = req.body.name;
    const description = req.body.description;
    const fileName = req.file.filename;
    imageManager.postObject(type, name, description, fileName, userId);
    res.redirect('/images');
  } catch (err) {
    res.status(505).send('Internal Client Error');
  }
}
