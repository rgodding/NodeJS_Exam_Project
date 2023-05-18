import firebaseManager from "../databases/firebase/firebaseManager.js";
import documentModel from "../models/documentModel.js";
const type = 'documents'

async function fetchAllData(req, res){
    try {
        const userId = req.params.userId;
        const data = await firebaseManager.fetchAllData(`${type}::${userId}`);
        if(!data){
            res.send([])
        } else {
            const documents = [];
            data.forEach(object => {
                documents.push(documentModel(object.data, object.id));
            })
            res.send(documents);
        }
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
async function fetchDataById(req, res){
    try {
        const userId = req.session.userId;
        const id = req.params.id;
        const data = await firebaseManager.fetchDataById(`${type}::${userId}`, id);
        if(!data){
            res.send({})
        } else {
            const data = documentModel(data.data, data.id);
        }
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function postData(req, res){
    try {
        const type = req.params.type;
        const content = req.body.content;
        const data = {
            type: type,
            content: content,
        }
        const document = documentModel(data);
        firebaseManager.postData(`${type}::${userId}`, document);
        res.status(202).send('OK');
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
        const id = req.params.id;
        const type = req.params.type;
        const content = req.body.content;
        const data = {
            type: type,
            content: content,
        }
        const document = constructNewDocument(data);
        firebaseManager.updateData(`${type}::${userId}`, id, document);
        res.status(200).send('OK')
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function deleteData(req, res){
    try {
        const id = req.params.id;
        const userId = req.session.userId;
        firebaseManager.deleteData(`${type}::${userId}`, id);
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