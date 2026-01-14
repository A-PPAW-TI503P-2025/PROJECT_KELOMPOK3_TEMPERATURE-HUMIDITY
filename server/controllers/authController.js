const db = require('../config/database');
const jwt = require('jsonwebtoken');

// Kunci rahasia untuk token (bisa apa saja)
const SECRET_KEY = 'rahasia_negara_api';

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // Jika user tidak ditemukan
        if (results.length === 0) {
            return res.status(401).json({ message: "Username atau Password salah!" });
        }

        const user = results[0];

        // Buat Token (Tiket) yang berisi ID dan ROLE
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.username },
            SECRET_KEY,
            { expiresIn: '1d' } // Token berlaku 1 hari
        );

        // Kirim data user & token ke Frontend
        res.json({
            message: "Login Berhasil",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    });
};

exports.register = (req, res) => {
    const { username, password, role } = req.body;

    // Cek apakah username sudah ada?
    const checkSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkSql, [username], (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ message: "Username sudah dipakai!" });
        }

        // Jika belum ada, masukkan ke database
        // Default role 'user' jika tidak dipilih
        const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        const userRole = role || 'user'; 

        db.query(sql, [username, password, userRole], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Registrasi Berhasil! Silakan Login." });
        });
    });
};