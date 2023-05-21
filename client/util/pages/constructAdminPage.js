import templateEngine from "../templateEngine.js";

export default async function constructAdminPage(isUser, userId) {
  const html = templateEngine.readPage('./views/pages/admin.html')
  .replace('$ADMIN_PAGE_USERS', await constructUserList(userId))
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Admin Page',
    isUser: isUser,
  });
  return page;
}

async function constructUserList(userId){
  const users = await userManager
  return 'userlist';
}
