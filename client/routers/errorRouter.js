import templateEngine from '../util/templateEngine.js';
import checkUser from '../middleware/checkUser.js';
import { Router } from 'express';
const router = Router();

router.use(checkUser, (req, res, next) => {
  const invalidEndpointPage = templateEngine.readPage('./views/pages/invalidendpoint.html');
  const invalidEndpointRenderedPage = templateEngine.renderPage(invalidEndpointPage, {
    tabTitle: 'Invalid Endpoint',
    isUser: req.isUser,
  });
  res.status(404).send(invalidEndpointRenderedPage);
});

export default router;
