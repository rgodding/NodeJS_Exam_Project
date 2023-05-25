import constructUserPage from '../util/pages/constructUserPage.js';

export async function showUser(req, res) {
  try {
    const page = await constructUserPage(req.isUser, req.userId);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
