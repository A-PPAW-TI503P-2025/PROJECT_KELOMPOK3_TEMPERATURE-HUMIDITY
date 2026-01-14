const db = require('../config/database');

// 1. Simpan Data (Dipakai ESP32)
exports.saveSensorData = (req, res) => {
    const { temperature, humidity } = req.body;
    // Kita hardcode device_id = 1 (sesuai data dummy SQL tadi)
    const device_id = 1; 

    const sql = "INSERT INTO sensor_logs (temperature, humidity, device_id) VALUES (?, ?, ?)";
    
    db.query(sql, [temperature, humidity, device_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Gagal simpan data" });
        }
        res.status(201).json({ message: "Data saved", id: result.insertId });
    });
};

// 2. Ambil Data Terakhir (Untuk Card Realtime)
exports.getLatestData = (req, res) => {
    const sql = "SELECT * FROM sensor_logs ORDER BY id DESC LIMIT 1";
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0] || { temperature: 0, humidity: 0 }); 
    });
};

// 3. Ambil 10 Data Terakhir (Untuk Tabel/Grafik Log)
exports.getHistory = (req, res) => {
    const sql = "SELECT * FROM sensor_logs ORDER BY id DESC LIMIT 10";
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.clearLogs = (req, res) => {
    const sql = "TRUNCATE TABLE sensor_logs"; // TRUNCATE = Hapus semua isi tabel & reset ID
    
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Semua data log berhasil dihapus!" });
    });
};