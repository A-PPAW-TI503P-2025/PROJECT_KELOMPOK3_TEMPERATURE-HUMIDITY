@startuml
|Hardware (ESP32)|
start
:Baca Sensor DHT11;
:Format Data ke JSON;
:Kirim Data (HTTP POST) ke Server;

|Backend (Node.js)|
:Terima Request API;
:Validasi Data;
:Simpan ke Database;

|Database (MySQL)|
:Insert Data to 'sensor_logs';

|Backend (Node.js)|
:Kirim Response 'Success' ke ESP32;

|Frontend (React.js)|
:Request Data Terbaru (Interval 5s);
|Backend (Node.js)|
:Query Data Terakhir dari DB;
|Database (MySQL)|
:Select * From sensor_logs;
|Backend (Node.js)|
:Kirim Data JSON ke Frontend;

|Frontend (React.js)|
:Update Tampilan (Angka & Grafik);
stop
@enduml