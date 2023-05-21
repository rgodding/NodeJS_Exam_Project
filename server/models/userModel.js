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
        userId: data.userId,
        email: email,
        firstName: data.firstName,
        lastName: data.lastName,
    }
    return user;
}
function constructNewUserModel(data){
    const user = {
        userId: data.userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
    }
    return user;
}