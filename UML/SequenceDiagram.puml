@startuml
actor User
participant "React Frontend" as FE
participant "Node.js API" as BE
participant "MySQL Database" as DB

User -> FE: Buka Halaman Dashboard
activate FE

loop Setiap 5 Detik (Auto Refresh)
    FE -> BE: GET /api/sensor/latest
    activate BE
    
    BE -> DB: SELECT * FROM sensor_logs ORDER BY time DESC LIMIT 1
    activate DB
    DB --> BE: Return Data {temp: 30, hum: 60}
    deactivate DB
    
    BE --> FE: JSON Response
    deactivate BE
    
    FE -> FE: Update UI (Grafik/Angka)
end

deactivate FE
@enduml