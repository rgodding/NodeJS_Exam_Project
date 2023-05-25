import constructAdminPage from '../util/pages/constructAdminPage.js';
import dotenv from 'dotenv/config';

export async function showAdmin(req, res) {
  try {
    const userId = req.session.userId;
    if (userId === process.env.ADMIN_ID) {
      const page = await constructAdminPage(req.isUser, userId);
      res.send(page);
    } else {
      res.status(404).send('ERROR');
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
