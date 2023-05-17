export default function userModel(data, id){
    if(id){
        return constructUserModel(data, id);
    } else {
        return constructNewUserModel(data);
    }
}
function constructUserModel(data, id){
    const user = {
        id: id,
        firstName: data.firstName,
        lastName: data.lastName,
    }
    return user;
}
function constructNewUserModel(data){
    const user = {
        id: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
    }
    return user;
}