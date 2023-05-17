
export default function socketIo(io){
    io.on("connection", (socket) => {
        console.log('A client connected', socket.id)
    })
    
}