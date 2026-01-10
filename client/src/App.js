import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // STATE LOGIN
  const [user, setUser] = useState(null); // Data user yang sedang login
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // STATE DATA SENSOR
  const [latest, setLatest] = useState({ temperature: 0, humidity: 0 });
  const [history, setHistory] = useState([]);

  // --- FUNGSI LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: usernameInput,
        password: passwordInput
      });
      // Simpan data user ke state
      setUser(res.data.user);
      setLoginError("");
    } catch (err) {
      setLoginError("Login Gagal! Cek username/password.");
    }
  };

  // --- FUNGSI LOGOUT ---
  const handleLogout = () => {
    setUser(null);
    setHistory([]);
  };

  // --- FUNGSI AMBIL DATA (Hanya jalan kalau sudah login) ---
  useEffect(() => {
    if (!user) return; // Kalau belum login, stop disini.

    const fetchData = async () => {
      try {
        const resLatest = await axios.get('http://localhost:5000/api/sensor/latest');
        setLatest(resLatest.data);
        const resHistory = await axios.get('http://localhost:5000/api/sensor/history');
        setHistory(resHistory.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, 3000); 
    return () => clearInterval(interval);
  }, [user]); // Dijalankan ulang saat 'user' berubah (login)

  
  // --- TAMPILAN 1: JIKA BELUM LOGIN (FORM LOGIN) ---
  if (!user) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>🔐 Login Sistem IoT</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Username" 
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button type="submit">MASUK</button>
          </form>
          {loginError && <p className="error-msg">{loginError}</p>}
          <p className="hint">Hint: admin/admin123</p>
        </div>
      </div>
    );
  }

  // --- TAMPILAN 2: JIKA SUDAH LOGIN (DASHBOARD) ---
  return (
    <div className="App">
      <div className="header">
        <div className="header-left">
          <h1>Sistem Monitoring IoT</h1>
          <p>Halo, <b>{user.username}</b> (Role: {user.role})</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      {/* DASHBOARD MONITORING */}
      <div className="dashboard">
        <div className="card">
          <h2>Suhu Ruangan</h2>
          <div className="value temp">{latest.temperature}°C</div>
        </div>
        <div className="card">
          <h2>Kelembaban</h2>
          <div className="value hum">{latest.humidity}%</div>
        </div>
      </div>

      {/* FITUR KHUSUS ADMIN (Sesuai Flowchart/UML) */}
      {user.role === 'admin' && (
        <div className="admin-controls">
          <h3>🛠️ Panel Admin</h3>
          <button className="btn-danger" onClick={() => alert("Fitur Hapus Data (Demo)")}>
            Hapus Semua Data Log
          </button>
          <button className="btn-primary" onClick={() => alert("Fitur Download Laporan (Demo)")}>
            Download Laporan PDF
          </button>
        </div>
      )}

      {/* TABEL LOG */}
      <h3>Riwayat Data Sensor</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Suhu</th>
            <th>Kelembaban</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.temperature}°C</td>
              <td>{row.humidity}%</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;