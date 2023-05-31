import showdown from 'showdown';
const converter = new showdown.Converter();

export default function readMarkdownToHtml(content) {
  const html = converter.makeHtml(content);
  return html;
}
