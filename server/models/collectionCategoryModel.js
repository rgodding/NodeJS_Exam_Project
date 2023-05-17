export default function collectionCategoryModel(data, id){
    if(id){
        return constructCollectionCategoryModel(data, id);
    } else {
        return constructNewCollectionCategoryModel(data);
    }
}
function constructCollectionCategoryModel(data, id){
    const collection = {
        id: id,
        name: data.name,
        type: data.type,
    }
    return collection;
}
function constructNewCollectionCategoryModel(data){
    const collection = {
        name: data.name,
        type: data.type,
    }
    return collection;
}