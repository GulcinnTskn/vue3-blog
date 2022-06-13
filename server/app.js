const socketio = require("socket.io")
const express = require("express")
const app = express()
const http = require("http")

const PORT = process.env.PORT || 2000

const server = http.createServer(app)

const io = socketio(server, {
    cors : {
        origin : "*",
        methods : ["GET","POST","OPTIONS"],
    },

})

server.listen(PORT, () => {
   // göndermek için emit, almak için on Vue2deki gibi
    io.on("connection", socket => {  // tüm socketteki kişiler için io, yeni bağlanan kişi için socket 
        console.log(socket);
        console.log("DENEME");

        socket.emit("WELCOME_MESSAGE",`Merhaba ${socket.id} Hoşgeldin`)
        socket.on("NEW_BLOG_EVENT", blog => {
            console.log("blog :>> ", blog);
            // io.emit("NEW_BLOG_ADDED", blog);
            // Gonderen hariç herkese blog bilgisini gonder..
            socket.broadcast.emit("NEW_BLOG_ADDED", blog);
        })
    });
})