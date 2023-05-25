import constructDocumentsPage from '../util/pages/constructDocumentsPage.js';

export async function showDocuments(req, res) {
  try {
    const page = await constructDocumentsPage(req.isUser, req.userId);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
