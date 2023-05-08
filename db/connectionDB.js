require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.log('Error al conectarse a la base de datos:', error);
  });

module.exports = {
    mongoose,
    connection: mongoose.connection,
};
