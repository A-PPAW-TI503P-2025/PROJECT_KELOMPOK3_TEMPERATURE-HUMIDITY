const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Ganti jika user mysql kamu beda
    password: '',      // Ganti jika ada password
    database: 'iot_project',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error('Database Error:', err);
    } else {
        console.log('Connected to MySQL Database.');
    }
});

module.exports = db;