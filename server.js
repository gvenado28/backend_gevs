const express = require('express');
const bcrypt = require('bcrypt'); // Agrega esta línea al inicio de tu archivo
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database'); // Asegúrate de que esta línea esté presente
const User = require('./models/User'); // Asegúrate de que la ruta sea correcta


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Clave secreta para JWT desde variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Sincroniza la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Rutas
app.get('/', (req, res) => {
  res.send('Backend está funcionando correctamente.');
});

// Ruta de inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token, user });
  }

  return res.status(401).json({ message: 'Credenciales inválidas.' });
});

// Ruta de registro
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body; // Incluye el campo username

  // Verifica si el usuario ya existe
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya existe.' });
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  try {
    const newUser = await User.create({ username, email, password: hashedPassword }); // Incluye username

    // Crear y firmar un token
    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

    // Responder con el token y el usuario
    res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
