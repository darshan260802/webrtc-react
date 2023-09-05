const {Server} = require('socket.io');

const io = new Server(7000, {
    cors:true
})

const roomToEmailMap = new Map();


io.on('connection', (socket)=>{
    console.log('a user connected with id :', socket.id );

    // On Room Join
    socket.on('room:join', ({room, email})=>{
        let existingEmail = roomToEmailMap.get(room);
        roomToEmailMap.set(room, existingEmail ? [...existingEmail, email] : [email]);
        socket.join(room);
        console.log('user with email :', email, 'joined to room :', room);
        io.to(room).emit("room:join", {room, members: roomToEmailMap.get(room), socketId: socket.id});
    })
})