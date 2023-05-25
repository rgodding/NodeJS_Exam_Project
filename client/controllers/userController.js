import constructUserPage from '../util/pages/constructUserPage.js';

export async function showUser(req, res) {
  try {
    const userId = req.session.userId;
    const page = await constructUserPage(req.isUser, userId);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
