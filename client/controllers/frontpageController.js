import constructFrontpagePage from '../util/pages/constructFrontpagePage.js';
export function showFrontpage(req, res) {
  try {
    const page = constructFrontpagePage(req.isUser, req.userId);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
