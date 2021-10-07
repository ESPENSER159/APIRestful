const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'PassSecret',
    database: 'persons'
});

pool.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOO_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    
    if(connection) connection.release();
    console.log('Conectado a la DB');
    return;
});


module.exports = pool;