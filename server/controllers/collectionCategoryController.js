import firebaseManager from "../databases/firebase/firebaseManager";
import collectionCategoryModel from "../models/collectionCategoryModel";
const type = 'collection-categories'

async function fetchAllData(req, res){
    try {
        const userId = req.session.userId;
        const data = await firebaseManager.fetchAllData(`${type}::${userId}`)
        if(!data){
            res.send([])
        } else {
            const categories = [];
            data.forEach(object => {
                categories.push(collectionCategoryModel(object.data, object.id));
            })
            res.send(categories);
        }
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function fetchDataById(req, res){
    try {
        const id = req.params.id;
        const data = firebaseManager.fetchDataById(type, id);
        if(!data){
            res.send({})
        } else {
            const category = collectionCategoryModel(data.data, id);
            res.send(category)
        }
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function postData(req, res){
    try {
        const name = req.body.name;
        const type = req.body.type;
        const category = collectionCategoryModel({
            name: name,
            type: type,
        })
        firebaseManager.postData(type, category);
        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function putData(req, res){
    try {
        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function patchData(req, res){
    try {
        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function deleteData(req, res){
    try {
        const id = req.params.id;
        firebaseManager.deleteData(type, id);
        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}

export default {
    fetchAllData,
    fetchDataById,
    postData,
    putData,
    patchData,
    deleteData,
}