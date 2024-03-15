const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./db');

// Middleware para analizar las solicitudes en formato JSON
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para servir el archivo HTML de inicio de sesión
/*app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/login.html'));
});*/
// Ruta para servir el archivo HTML de registro de usuario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/prestamos.html'));
});



// Operaciones CRUD para Usuarios

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM Usuario', (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        res.json(results);
    });
});

// Obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Usuario WHERE id_usuario = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        res.json(results[0]);
    });
});

// Crear un nuevo usuario y empleado/docente
app.post('/usuarios', (req, res) => {
    const { nombreUsuario, contraseña, tipoUsuario, nombre, identificacion, departamento, cargo, contacto } = req.body;

    // Verificar si algún campo está vacío
    if (!nombreUsuario || !contraseña || !tipoUsuario || !nombre || !identificacion || !departamento || !cargo || !contacto) {
        res.status(400).send('Todos los campos son requeridos');
        return;
    }

    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        
        connection.query('INSERT INTO Usuario (nombre_usuario, contraseña, tipo_usuario) VALUES (?, ?, ?)', [nombreUsuario, contraseña, tipoUsuario], (error, results) => {
            if (error) {
                connection.rollback(function() {
                    res.status(500).send('Error interno del servidor');
                    throw error;
                });
            }

            const id_usuario = results.insertId;

            connection.query('INSERT INTO Empleado_Docente (nombre, identificacion, departamento, cargo, contacto, id_usuario) VALUES (?, ?, ?, ?, ?, ?)', [nombre, identificacion, departamento, cargo, contacto, id_usuario], (error, results) => {
                if (error) {
                    connection.rollback(function() {
                        res.status(500).send('Error interno del servidor');
                        throw error;
                    });
                }
                
                connection.commit(function(err) {
                    if (err) {
                        connection.rollback(function() {
                            res.status(500).send('Error interno del servidor');
                            throw err;
                        });
                    }
                    console.log('Transacción completada.');
                    res.status(201).send('Usuario y Empleado/Docente creados exitosamente');
                });
            });
        });
    });
});

// Actualizar un usuario existente
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombreUsuario, contraseña, tipoUsuario } = req.body;
    connection.query('UPDATE Usuario SET nombre_usuario = ?, contraseña = ?, tipo_usuario = ? WHERE id_usuario = ?', [nombreUsuario, contraseña, tipoUsuario, id], (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        res.send('Usuario actualizado exitosamente');
    });
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Usuario WHERE id_usuario = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        res.send('Usuario eliminado exitosamente');
    });
});

// Operaciones CRUD para Empleados/Docentes

// Obtener todos los empleados/docentes
app.get('/empleados-docentes', (req, res) => {
    connection.query('SELECT * FROM Empleado_Docente', (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        res.json(results);
    });
});

// Obtener un empleado/docente por su ID
app.get('/empleados-docentes/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Empleado_Docente WHERE id_empleado_docente = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        res.json(results[0]);
    });
});

// Actualizar un empleado/docente existente
app.put('/empleados-docentes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, identificacion, departamento, cargo, contacto, id_usuario } = req.body;
    connection.query('UPDATE Empleado_Docente SET nombre = ?, identificacion = ?, departamento = ?, cargo = ?, contacto = ?, id_usuario = ? WHERE id_empleado_docente = ?', [nombre, identificacion, departamento, cargo, contacto, id_usuario, id], (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        res.send('Empleado/Docente actualizado exitosamente');
    });
});

// Eliminar un empleado/docente
app.delete('/empleados-docentes/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Empleado_Docente WHERE id_empleado_docente = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        res.send('Empleado/Docente eliminado exitosamente');
    });
});

//Realizar Login
app.post('/login', (req, res) => {
    const { nombreUsuario, contraseña } = req.body;
    // Realizar la autenticación en la base de datos aquí
    // Por simplicidad, aquí solo se mostrará un mensaje de éxito si las credenciales son correctas
    if (nombreUsuario === 'usuario' && contraseña === 'contraseña') {
        res.status(200).send('Inicio de sesión exitoso');
    } else {
        res.status(401).send('Credenciales inválidas');
    }
});


// Crear un nuevo préstamo
app.post('/prestamos', (req, res) => {
    const { id_empleado_docente, id_equipo, fecha_solicitud, dirección_entrega } = req.body;

    // Verificar si algún campo está vacío
    if (!id_empleado_docente || !id_equipo || !fecha_solicitud || !dirección_entrega) {
        res.status(400).send('Todos los campos son requeridos');
        return;
    }

    // Insertar el préstamo en la base de datos
    connection.query('INSERT INTO Prestamo (id_empleado_docente, id_equipo, fecha_solicitud, dirección_entrega, estado) VALUES (?, ?, ?, ?, ?)', [id_empleado_docente, id_equipo, fecha_solicitud, dirección_entrega, 'pendiente'], (error, results) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
            throw error;
        }
        // Registro en la tabla Transacción
        const id_prestamo = results.insertId;
        const fecha_transaccion = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const tipo_transaccion = 'entrega';
        const detalles = 'Solicitud de préstamo';
        connection.query('INSERT INTO transaccion (id_préstamo, fecha_transaccion, tipo_transaccion, detalles) VALUES (?, ?, ?, ?)', [id_prestamo, fecha_transaccion, tipo_transaccion, detalles], (error, results) => {
            if (error) {
                res.status(500).send('Error interno del servidor');
                throw error;
            }
            res.status(201).send('Préstamo creado exitosamente');
        });
    });
});


// Aprobar un préstamo
app.post('/prestamosAprobar', (req, res) => {
    const { id_empleado_docente, id_equipo, fecha_solicitud, dirección_entrega } = req.body;

    // Verificar si algún campo está vacío
    if (!id_empleado_docente || !id_equipo || !fecha_solicitud || !dirección_entrega) {
        res.status(400).send('Todos los campos son requeridos');
        return;
    }

        // Registro en la tabla Transacción
        const id_prestamo = results.insertId;
        const fecha_transaccion = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const tipo_transaccion = 'retiro';
        const detalles = 'Aprobación de préstamo';
        connection.query('INSERT INTO transaccion (id_préstamo, fecha_transaccion, tipo_transaccion, detalles) VALUES (?, ?, ?, ?)', [id_prestamo, fecha_transaccion, tipo_transaccion, detalles], (error, results) => {
            if (error) {
                res.status(500).send('Error interno del servidor');
                throw error;
            }
            res.status(201).send('Préstamo creado exitosamente');
        });
    });




// Configuración del servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
