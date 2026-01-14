import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FaThermometerHalf, FaTint, FaSignOutAlt, FaUserCircle, FaHistory, FaTachometerAlt } from 'react-icons/fa';

function App() {
  const [user, setUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [roleInput, setRoleInput] = useState("user");
  const [loginError, setLoginError] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [latest, setLatest] = useState({ temperature: 0, humidity: 0 });
  const [history, setHistory] = useState([]);

  // --- LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: usernameInput,
        password: passwordInput
      });
      setUser(res.data.user);
      setLoginError("");
    } catch (err) {
      setLoginError("Login Gagal! Periksa username/password.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: usernameInput,
        password: passwordInput,
        role: roleInput
      });
      alert("Registrasi Berhasil! Silakan Login.");
      setIsRegisterMode(false);
      setLoginError("");
    } catch (err) {
      setLoginError(err.response?.data?.message || "Registrasi Gagal");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setHistory([]);
  };

  useEffect(() => {
    if (!user) return;
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
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const handleResetData = async () => {
    if (window.confirm("Yakin ingin menghapus SEMUA data log? Tindakan ini tidak bisa dibatalkan!")) {
        try {
            await axios.delete('http://localhost:5000/api/sensor/clear');
            alert("Data berhasil dikosongkan.");
            setHistory([]); // Kosongkan tabel di layar
            setLatest({ temperature: 0, humidity: 0 }); // Reset kartu
        } catch (err) {
            console.error(err);
            alert("Gagal menghapus data.");
        }
    }
};

const handleDownload = () => {
    if (history.length === 0) {
        alert("Tidak ada data untuk diunduh!");
        return;
    }

    // 1. Buat Header CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Suhu,Kelembaban,Waktu\n";

    // 2. Masukkan Data baris per baris
    history.forEach(row => {
        const time = new Date(row.created_at).toLocaleString().replace(/,/g, ''); // Hapus koma di format waktu agar aman
        csvContent += `${row.id},${row.temperature},${row.humidity},${time}\n`;
    });

    // 3. Buat Link Download Palsu & Klik Otomatis
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laporan_sensor_iot.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  // --- TAMPILAN LOGIN  ---
  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isRegisterMode ? "Buat Akun Baru" : "Selamat Datang"}</h2>
            <p>Sistem Monitoring IoT Terintegrasi</p>
          </div>
          
          <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Username" 
                value={usernameInput} 
                onChange={(e) => setUsernameInput(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                required 
              />
            </div>

            {isRegisterMode && (
              <div className="input-group">
                <select value={roleInput} onChange={(e) => setRoleInput(e.target.value)}>
                  <option value="user">User Staff</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn-auth">
              {isRegisterMode ? "Daftar Sekarang" : "Masuk Dashboard"}
            </button>
          </form>

          {loginError && <p className="error-msg">{loginError}</p>}
          
          <p className="toggle-auth" onClick={() => { setIsRegisterMode(!isRegisterMode); setLoginError(""); }}>
            {isRegisterMode ? "Sudah punya akun? Login" : "Belum punya akun? Daftar"}
          </p>
        </div>
      </div>
    );
  }

  // --- TAMPILAN DASHBOARD ---
  return (
    <div className="App">
      {/* NAVBAR DIATAS */}
      <nav className="navbar">
        <div className="nav-brand">
          <FaTachometerAlt className="nav-icon" />
          <span>IoT Monitor</span>
        </div>
        <div className="nav-menu">
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <span>Halo, <b>{user.username}</b> ({user.role})</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt /> Keluar
          </button>
        </div>
      </nav>

      {/* KONTEN UTAMA */}
      <div className="main-content">
        
        {/* SECTION STATISTIK */}
        <div className="stats-grid">
          {/* Kartu Suhu */}
          <div className="stat-card temp-card">
            <div className="card-icon"><FaThermometerHalf /></div>
            <div className="card-info">
              <h3>Suhu Ruangan</h3>
              <div className="value">{latest.temperature}°C</div>
              <p className="status">Status: {latest.temperature > 30 ? "Panas" : "Normal"}</p>
            </div>
          </div>

          {/* Kartu Kelembaban */}
          <div className="stat-card hum-card">
            <div className="card-icon"><FaTint /></div>
            <div className="card-info">
              <h3>Kelembaban</h3>
              <div className="value">{latest.humidity}%</div>
              <p className="status">Udara: {latest.humidity > 70 ? "Basah" : "Kering"}</p>
            </div>
          </div>
        </div>

        {/* SECTION ADMIN CONTROL */}
        {user.role === 'admin' && (
          <div className="admin-panel">
            <h3>🛠️ Kontrol Admin</h3>
            <div className="admin-actions">
              <button className="btn-action danger" onClick={handleResetData}>Reset Data Log </button>
              <button className="btn-action primary" onClick={handleDownload}>Download Data (CSV) </button>
            </div>
          </div>
        )}

        {/* SECTION TABEL */}
        <div className="table-container">
          <div className="table-header">
            <h3><FaHistory /> Riwayat Data Sensor</h3>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID Log</th>
                <th>Suhu (°C)</th>
                <th>Kelembaban (%)</th>
                <th>Waktu Pencatatan</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={row.id}>
                  <td>#{row.id}</td>
                  <td style={{ color: '#e74c3c', fontWeight: 'bold' }}>{row.temperature}°</td>
                  <td style={{ color: '#3498db', fontWeight: 'bold' }}>{row.humidity}%</td>
                  <td>{new Date(row.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;