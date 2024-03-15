const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000; // Or any port you prefer

app.use(bodyParser.json());

// Login route
app.post('/login', (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    
    // Validate login data (optional)
    if (!nombreUsuario || !contraseña) {
        return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridosSSS' });
    }

    // Check credentials in the database (sample query)
    db.query('SELECT * FROM usuario WHERE nombre_usuario = ? AND contraseña = ?', [nombreUsuario, contraseña], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Error de servidor' });
        }

        if (results.length === 1) {
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
