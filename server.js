const express = require('express');
const bcrypt = require('bcrypt'); // Agrega esta línea al inicio de tu archivo
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { sequelize, User } = require('./config/database'); // Asegúrate de que esta línea esté presente

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
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario en la base de datos
    const user = await User.findOne({ where: { email } });

    // Verifica si el usuario existe
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Compara la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Crear y firmar un token
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    // Responder con el token y el usuario
    return res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
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
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Crear y firmar un token
    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

    // Responder con el token y el usuario
    res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
