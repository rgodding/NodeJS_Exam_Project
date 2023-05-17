import firebaseManager from "../databases/firebase/firebaseManager";
const type = 'users'

function fetchAllData(req, res){
    try {
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function fetchDataById(req, res){
    try {
        const id = req.session.userid;
        const user = firebaseManager.fetchDataById(type, id)
        if(!user){
            res.send({});
        } else {
            res.send(user);
        }
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Server Error')
    }
}
function postData(req, res){
    try {
        const id = ''; // Recieve after creating a user?
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
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
        const id = req.session.userid;
        firebaseManager.deleteData(type, id);
        res.send({ status: 'account deleted' })
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