import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [latest, setLatest] = useState({ temperature: 0, humidity: 0 });
  const [history, setHistory] = useState([]);

  // Fungsi ambil data dari Backend
  const fetchData = async () => {
    try {
      // 1. Ambil data terbaru
      const resLatest = await axios.get('http://localhost:5000/api/sensor/latest');
      setLatest(resLatest.data);

      // 2. Ambil data history (log)
      const resHistory = await axios.get('http://localhost:5000/api/sensor/history');
      setHistory(resHistory.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Otomatis refresh setiap 3 detik
  useEffect(() => {
    fetchData(); // Jalankan pertama kali
    const interval = setInterval(fetchData, 3000); // Loop 3 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Monitoring Suhu & Kelembaban IoT</h1>
        <p>Status: {latest.temperature > 0 ? "Online" : "Connecting..."}</p>
      </div>

      {/* CARD MONITORING */}
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

      {/* TABEL DATA LOG */}
      <h3>Riwayat Data (10 Terakhir)</h3>
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