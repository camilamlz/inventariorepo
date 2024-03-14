const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, // Puerto MySQL predeterminado
    user: 'root',
    password: '1234',
    database: 'techmanagement'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

module.exports = connection;
