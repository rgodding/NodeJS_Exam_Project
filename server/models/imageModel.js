export default function imageModel(data, id){
    if(id){
        return constructImageModel(data, id);
    } else {
        return constructNewImageModel(data);
    }
}
function constructImageModel(data, id){
    const image = {
        id: id,
        name: data.name,
        description: data.description,
        collection: data.collection,
        fileName: data.fileName,
    }
    return image;
}
function constructNewImageModel(data){
    const image = {
        name: data.name,
        description: data.description,
        collection: data.collection,
        fileName: data.fileName,
    }
    return image;
}