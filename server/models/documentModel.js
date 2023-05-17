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
    const document = {
        content: data.content,
        date: data.date,
        time: data.time,
    }
    return document;
}