import firebaseManager from "../databases/firebase/firebaseManager.js";
import collectionModel from "../models/collectionModel.js";
const databaseName = 'collections'

async function fetchAllData(req, res){
    try {
        const userId = req.params.userId;
        const data = await firebaseManager.fetchAllData(`${databaseName}::${userId}`);
        if(!data){
            res.send([])
        } else {
            const collections = [];
            data.forEach(object => {
                collections.push(collectionModel(object.data, object.id));
            })
            res.send(collections);
        }
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
async function fetchDataById(req, res){
    try {
        const id = req.params.id;
        const userId = req.session.userId;
        const data = await firebaseManager.fetchDataById(`${databaseName}::${userId}`, id);
        if(!data){
            res.send({})
        } else {
            const data = collectionModel(data.data, data.id);
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
        const category = req.body.category;
        const userId = req.params.userId;
        const data = {
            name: name,
            type: type,
            category: category,
        }
        const collection = collectionModel(data);
        firebaseManager.postData(`${databaseName}::${userId}`, collection);
        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function putData(req, res){
    try {
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function patchData(req, res){
    try {
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function deleteData(req, res){
    try {
        const id = req.params.id;
        const userId = req.params.userId;
        firebaseManager.deleteData(`${databaseName}::${userId}`, id);
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