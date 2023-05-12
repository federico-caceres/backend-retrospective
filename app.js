require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const retrospectiveRoute = require('./routes/retrospectiveRoute');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server,{ 
    cors: {
      origin: '*',
    }
  });

// Configuración para permitir solicitudes CORS desde cualquier origen
app.use(cors());

// Body parser
app.use(bodyParser.json());

// Rutas de la aplicación
app.use(retrospectiveRoute);

// Definimos el puerto
const port = process.env.PORT;

// Iniciamos el servidor socket
io.on('connection',(socket)=>{

  // Escuchamos el evento 'updateClient' cuando hay actualizacion de datos del cliente
  socket.on('updateClient', (data) => {
    // Si hay actualizacion de datos, emitimos el evento 'updateServer' para actualizar los datos de todos los clientes
    if(data){
      io.emit('updateServer', true);
    }
  });
  
  socket.join('clock-room')
  
  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
})


server.listen(port, () => console.log(`Listening on port ${port}!`));



