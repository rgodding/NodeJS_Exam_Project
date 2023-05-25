export default function documentModel(data, id) {
  if (id) {
    return constructDocumentModel(data, id);
  } else {
    return constructNewDocumentModel(data);
  }
}

function constructDocumentModel(data, id) {
  const document = {
    id: id,
    name: constructDocumentName(data.content),
    collection: data.collection,
    content: data.content,
    date: data.date,
    time: data.time,
  };
  return document;
}

function constructNewDocumentModel(data) {
  const time = new Date();
  const document = {
    content: data.content,
    collection: data.collection,
    date: getCurrentDate(time),
    time: getCurrentTime(time),
  };
  return document;
}

function getCurrentTime(timeStamp) {
  return timeStamp.toLocaleDateString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function getCurrentDate(timeStamp) {
  return timeStamp.toLocaleDateString();
}

function constructDocumentName(content) {
  content = content.split('\n');
  let result = content[0];
  if (result.includes('# ')) {
    result = result.substring(result.indexOf('# ') + 2);
  }
  return result;
}
