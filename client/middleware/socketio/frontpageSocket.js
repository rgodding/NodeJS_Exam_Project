export default function frontpageSocket(io){
    io.on('connection', (socket) => {
        console.log('A client connected to the front page', socket.id);
    })
}