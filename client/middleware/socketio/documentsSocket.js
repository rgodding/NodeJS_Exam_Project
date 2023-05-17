export default function documentsSocket(io){
    io.on('connection', (socket) => {
        console.log('A client connected to the documents', socket.id)

        socket.on("client test", async (data) => {
            console.log('here');
        })
    })
}