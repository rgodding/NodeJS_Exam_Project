import fs from 'fs';

export default function generateImages(privateImages, page) {
  if (!privateImages) {
    return page;
  } else {
    const images = findHTMLImgs(page);
    if (images) {
      return generateHtmlWithImages(page, images);
    } else {
      return page;
    }
  }
}
// Taken from outside source
function findHTMLImgs(page) {
  const regex = /<img[^>]*>/g;
  const imageTags = page.match(regex);
  return imageTags;
}

function generateHtmlWithImages(page, imagesString) {
  let html = page;
  for (let i = 0; i < imagesString.length; i++) {
    const imageString = imagesString[i];
    const fileLocation = imageString.match(/src="([^"]*)"/)[1];
    const image = fs.readFileSync(fileLocation.replace('/images', '.'));
    const imageBase64 = image.toString('base64');
    html = html.replace(fileLocation, `data:image/jpeg;base64,${imageBase64}`);
  }
  return html;
}
