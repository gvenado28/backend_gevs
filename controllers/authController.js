// src/controllers/authController.js
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    // Validación de campos requeridos
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }
  
    // Validación de seguridad de la contraseña
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.'
      });
    }
  
    // Lógica para crear el usuario...
  };
  