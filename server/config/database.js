// -- 1. Tabel User (Untuk Login Admin/User)
// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(50),
//     password VARCHAR(255),
//     role ENUM('admin', 'user')
// );

// -- 2. Tabel Devices (PENTING: Agar ada Foreign Key)
// CREATE TABLE devices (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     device_name VARCHAR(50),
//     location VARCHAR(100),
//     user_id INT, 
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
// );

// -- 3. Tabel Log Sensor (Data Suhu Masuk Sini)
// CREATE TABLE sensor_logs (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     temperature FLOAT,
//     humidity FLOAT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     device_id INT,
//     FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
// );

// -- DATA DUMMY (Wajib dijalankan agar kode berjalan lancar)
// INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin');
// INSERT INTO devices (id, device_name, location, user_id) VALUES (1, 'ESP32_Lab_1', 'Ruang Server', 1);