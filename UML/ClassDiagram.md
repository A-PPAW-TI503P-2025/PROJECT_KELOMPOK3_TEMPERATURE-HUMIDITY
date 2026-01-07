@startuml
class "DatabaseConfig" {
    + connection: MySQLConnection
    + connect(): void
}

class "SensorModel" {
    + id: int
    + temperature: float
    + humidity: float
    + created_at: timestamp
    + save(): void
    + getLatest(): json
    + getAll(): array
}

class "SensorController" {
    + receiveData(req, res): void
    + showDashboard(req, res): void
    + deleteLogs(req, res): void
}

class "UserController" {
    + login(req, res): void
    + register(req, res): void
}

class "ESP32_Firmware" {
    + readDHT(): float
    + sendHTTPPost(): void
}

SensorController --> SensorModel : uses
SensorModel --> DatabaseConfig : uses
ESP32_Firmware ..> SensorController : sends data via API
@enduml