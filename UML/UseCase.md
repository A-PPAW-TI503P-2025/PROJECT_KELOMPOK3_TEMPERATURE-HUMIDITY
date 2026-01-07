@startuml
left to right direction
actor "Admin" as admin
actor "User" as user
actor "ESP32 (Device)" as device

rectangle "Sistem Monitoring IoT" {
  usecase "Login Sistem" as UC1
  usecase "Input Data Sensor (Suhu/Kelembaban)" as UC2
  usecase "Lihat Dashboard Monitoring" as UC3
  usecase "Lihat Riwayat Data (Log)" as UC4
  usecase "Download Laporan (Excel/PDF)" as UC5
  usecase "Hapus Riwayat Data" as UC6
  usecase "Kelola Data User" as UC7
}

device --> UC2 : HTTP POST
user --> UC1
user --> UC3
user --> UC4

admin --> UC1
admin --> UC3
admin --> UC4
admin --> UC5
admin --> UC6
admin --> UC7

note right of UC2
  Otomatis oleh alat
  setiap 5-10 detik
end note
@enduml