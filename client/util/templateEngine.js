import fs from 'fs';

function renderPage(page, config = {}) {
  const main = getMain(config)
    .replace('$CSS_LINK', config.cssLink || '')
    .replace('$PAGE_TITLE', config.tabTitle)
    .replace('$PAGE_HEADER', getNavbar(config))
    .replace('$PAGE_MAIN', page);
  return main;
}

function renderPageWithSocket(page, config = {}) {
  const main = getMainWithSocket(config)
    .replace('$CSS_LINK', config.cssLink || '')
    .replace('$PAGE_TITLE', config.tabTitle)
    .replace('$PAGE_HEADER', getNavbar(config))
    .replace('$PAGE_MAIN', page);
  return main;
}

function readPage(pagePath) {
  return fs.readFileSync(pagePath).toString();
}

function getMain(config = {}) {
  const main = readPage('./views/layouts/main.html');
  return main;
}

function getMainWithSocket(config = {}) {
  const main = readPage('./views/layouts/socket.html');
  return main;
}

function getNavbar(config = {}) {
  const navbar = readPage('./views/partials/navbar/navbar.html').replace('$PAGE_NAME', 'My Website').replace('$NAVBAR_OPTIONS', getNavbarOptions(config.isUser)).replace('$NAVBAR_LOGIN_BUTTON', getNavbarLoginButton(config.isUser));
  return navbar;
}

function getNavbarOptions(isUser) {
  if (isUser) {
    return readPage('./views/partials/navbar/options.html');
  } else {
    return 'Please login';
  }
}

function getNavbarLoginButton(isUser) {
  if (isUser) {
    return readPage('./views/partials/navbar/logoutbutton.html');
  } else {
    return readPage('./views/partials/navbar/loginbutton.html');
  }
}

export default {
  readPage,
  renderPage,
  renderPageWithSocket,
};
