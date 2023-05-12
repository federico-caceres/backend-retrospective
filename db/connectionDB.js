require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/category');

async function createDefaultCategories() {
  const categoryNames = ['Went Well', 'To Improve', 'Action Items'];

  for (const name of categoryNames) {
    await Category.findOneAndUpdate({ name }, { name, color: '#69FF01' }, { upsert: true });
  }
}

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    createDefaultCategories()
    .then(() => console.log('Default categories created'))
    .catch(err => console.error(err))
  })
  .catch((error) => {
    console.log('Error al conectarse a la base de datos:', error);
  });

module.exports = {
    mongoose,
    connection: mongoose.connection,
};
