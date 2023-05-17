import firebaseManager from "../databases/firebase/firebaseManager.js";
import imageModel from "../models/imageModel.js";
const type = 'collectionimages'

async function fetchAllData(req, res){
    try {
        const userId = req.session.userId;
        const data = await firebaseManager.fetchAllData(`${type}::${userId}`);
        if(!data){
            res.send([])
        } else {
            const collections = [];
            data.forEach(object => {
                collections.push(imageModel(object.data, object.id));
            })
            res.send(collections);
        }
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function fetchDataById(req, res){
    try {

    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function postData(req, res){
    try {

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