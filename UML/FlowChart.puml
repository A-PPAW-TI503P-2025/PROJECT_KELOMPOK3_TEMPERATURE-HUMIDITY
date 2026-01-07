@startuml
start
:Buka Website;
:Halaman Login;
if (Login Berhasil?) then (Ya)
    :Cek Role Akun;
    if (Role == Admin?) then (Ya)
        :Masuk Dashboard Admin;
        fork
            :Lihat Grafik Real-time;
        fork again
            :Lihat Tabel Riwayat;
            if (Aksi Data?) then (Hapus)
                :Hapus Data Log;
            else (Download)
                :Export Data;
            endif
        fork again
            :Kelola User;
        end fork
    else (Tidak / User Biasa)
        :Masuk Dashboard User;
        fork
            :Lihat Grafik Real-time;
        fork again
            :Lihat Tabel Riwayat;
        end fork
    endif
    :Logout;
else (Tidak)
    :Tampilkan Pesan Error;
    stop
endif
stop
@enduml