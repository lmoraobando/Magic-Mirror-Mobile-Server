import express from 'express';
import ReadLocalFile from './readFiles/ReadLocalFile';
const app = express()
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server)
const path = require('path');
//👇🏻 New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());
const readFiles = new ReadLocalFile('/Users/leonardomoraobando/Documents/Images')

// Configurar el middleware para servir archivos estáticos (imágenes)
app.use(express.static(path.join(path.resolve(__dirname, '..'), '/src/images')));

io.on('connection', (socket) => {
    console.log('Cliente conectado.');

    // Manejar los datos recibidos del cliente
    socket.on('message', (data) => {
        console.log(`Cliente dice: ${data}`);

        readFiles.returnFileList();
        // Responder al cliente
        socket.emit('message', `Servidor dice: Hola, recibí tu mensaje: ${data}`);
    });

    // Manejar el cierre de la conexión del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Servidor Socket.IO escuchando en el puerto ${port}`);
});
