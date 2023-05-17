export default function documentModel(data, id){
    if(id){
        return constructDocumentModel(data, id);
    } else {
        return constructNewDocumentModel(data);
    }
}
function constructDocumentModel(data, id){
    const document = {
        id: id,
        content: data.content,
        date: data.date,
        time: data.time,
    }
    return document;
}
function constructNewDocumentModel(data){
    const time = new Date();
    const document = {
        content: data.content,
        date: getCurrentDate(time),
        time: getCurrentTime(time)
    }
    return document;
}

function getCurrentTime(timeStamp){
    return timeStamp.toLocalDateString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })
}
function getCurrentDate(timeStamp){
    return timeStamp.toLocalDateString();

}