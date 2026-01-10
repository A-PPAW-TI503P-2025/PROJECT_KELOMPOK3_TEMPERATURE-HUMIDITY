const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: 'MSidiq',      // Isi dewe
    port: 3307 ,             // Ganti yen perlu
    database: 'iot_project'
});

db.connect((err) => {
    if (err) {
        console.error('Database Error:', err);
    } else {
        console.log('Connected to MySQL Database.');
    }
});

module.exports = db;