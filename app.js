const express = require('express');
const sequelize = require('./sequelize');  // Importa la conexión de Sequelize

const app = express();
const port = process.env.PORT || 3000;

// Prueba de conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

app.get('/', (req, res) => {
  res.send('Aplicación corriendo y conectada a la base de datos.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
