export default function socketIo(io){
    io.on("connection", (socket) => {
        console.log('A client connected', socket.id)
        loginSocket(socket, io)
        documentsSocket(socket, io);
        imagesSocket(socket, io);
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
