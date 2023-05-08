require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const retrospectiveRoute = require('./routes/retrospectiveRoute');

// Configuración para permitir solicitudes CORS desde cualquier origen
app.use(cors());

// Body parser
app.use(bodyParser.json());

// Rutas de la aplicación
app.use(retrospectiveRoute);

// Definimos el puerto
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}!`));



