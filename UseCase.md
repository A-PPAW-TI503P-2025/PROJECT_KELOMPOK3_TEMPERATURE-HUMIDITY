@startuml
title Use Case Diagram
title Sistem Informasi Temperature dan Humidity
title Berbasis Web

left to right direction
skinparam packageStyle rectangle

actor Admin
actor User
actor "IoT Device" as IoT

rectangle "Sistem Informasi\nTemperature Humidity" {

  usecase "Login" as UC_Login
  usecase "Register" as UC_Register
  usecase "Logout" as UC_Logout

  usecase "Monitoring\nTemperature Humidity" as UC_Monitor
  usecase "Melihat Data\nHistoris" as UC_History
  usecase "Kelola Perangkat\nIoT" as UC_IoT
  usecase "Kelola User" as UC_User
  usecase "Kirim Data\nSensor" as UC_Send
}

Admin --> UC_Monitor
Admin --> UC_History
Admin --> UC_IoT
Admin --> UC_User

User --> UC_Monitor
User --> UC_History

IoT --> UC_Send

' ==== RELASI INCLUDE (WAJIB LOGIN) ====
UC_Monitor ..> UC_Login : <<include>>
UC_History ..> UC_Login : <<include>>
UC_IoT ..> UC_Login : <<include>>
UC_User ..> UC_Login : <<include>>
UC_Login ..> UC_Register : <<include>>

UC_Logout ..> UC_Login : <<extend>>

@enduml