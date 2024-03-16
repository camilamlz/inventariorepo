const mysql = require('mysql');

//Local database
/*
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, // Puerto MySQL predeterminado
    user: 'root',
    password: '1234',
    database: 'techmanagement'
});
*/
//Online database
const connection = mysql.createConnection({
    host: 'bdfqojyf0cukhwtj2lrp-mysql.services.clever-cloud.com',
    port: 3306, // Puerto MySQL predeterminado
    user: 'ujexj44j3fxeleam',
    password: 'OXzTE7uwRVawyUcE9KUz',
    database: 'bdfqojyf0cukhwtj2lrp'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

module.exports = connection;
