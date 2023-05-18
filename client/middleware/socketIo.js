import collectionCategoryManager from "../repository/collectionCategoryManager.js";
import collectionManager from "../repository/collectionManager.js";

export default function socketIo(io){
    io.on("connection", (socket) => {
        console.log('A client connected', socket.id)
        loginSocket(socket, io)
        documentsSocket(socket, io);
        imagesSocket(socket, io);
        userSocket(socket, io);
        adminSocket(socket, io);
    })
}
function loginSocket(socket, io){
}
function documentsSocket(socket, io){
}
function imagesSocket(socket, io){
}
function adminSocket(socket, io){
}
function userSocket(socket, io){
    socket.on('a client creates a collection category', (data) => {
        collectionCategoryManager.postObject(data.name, data.type, data.userId);
        io.emit('a collection category was created')
    })
    socket.on('a client creates a collection', (data) => {
        collectionManager.postObject(data.category, data.name, data.type, data.userId);
        io.emit('a collection was created')
    })
    socket.on('a client deletes a collection category', (data) => {
        collectionCategoryManager.deleteObject(data.id, data.userId);
        io.emit('a collection category was deleted')
    })
    socket.on('a client deletes a collection', (data) => {
        collectionManager.deleteObject(data.id, data.userId);
        io.emit('a collection was deleted')
    })
}