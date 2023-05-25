import templateEngine from '../templateEngine.js';
import userManager from '../../repository/userManager.js';

export default async function constructAdminPage(isUser, userId) {
  const html = templateEngine.readPage('./views/pages/admin.html').replace('$ADMIN_PAGE_USERS', await constructUserList(userId));
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Admin Page',
    isUser: isUser,
    userId: userId,
  });
  return page;
}

async function constructUserList(userId) {
  const users = await userManager.fetchAllObjects(userId);
  let html = '';
  users.forEach((user) => {
    html += templateEngine.readPage('./views/partials/admin/tableitem.html')
    .replace('$DOCUMENT_TABLE_ITEM_USER_ID', user.userId)
    .replace('$DOCUMENT_TABLE_ITEM_FIRST_NAME', user.firstName)
    .replace('$DOCUMENT_TABLE_ITEM_LAST_NAME', user.lastName)
    .replace('$DOCUMENT_TABLE_ITEM_EMAIL', user.email)
    .replace('$TABLE_ITEM_ID', user.id);
  });
  return html;
}
