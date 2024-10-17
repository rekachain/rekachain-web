<?php

return [
    'login' => [
        'title' => 'Selamat Datang Kembali!',
        'fields' => [
            'nip' => 'NIP',
            'password' => 'Kata Sandi',
            'remember' => 'Ingat Saya',
        ],
        'buttons' => [
            'forgot_password' => 'Lupa Kata Sandi?',
            'sign_in' => 'Masuk',
        ],
    ],
    'dashboard' => [
        'index' => [
            'title' => 'Halaman Utama',
            'welcome' => 'Selamat datang di Halaman Utama',
        ],
    ],
    'work_days' => [
        'index' => [
            'title' => 'Hari Kerja',
            'buttons' => [
                'create' => 'Buat Hari Kerja',
            ],
            'partials' => [
                'work_days' => [
                    'messages' => [
                        'deleted' => 'Hari Kerja berhasil dihapus!',
                    ],
                    'partials' => [
                        'work_day_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'start_date' => 'Tanggal Mulai',
                                'break_time' => 'Waktu Istirahat',
                                'end_date' => 'Tanggal Selesai',
                            ],
                        ],
                        'work_day_card' => [
                            'headers' => [
                                'name' => 'Nama',
                                'start_date' => 'Tanggal Mulai',
                                'break_time' => 'Waktu Istirahat',
                                'end_date' => 'Tanggal Selesai',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Hari Kerja',
            'fields' => [
                'name' => 'Nama',
                'start_date' => 'Tanggal Mulai',
                'break_time' => 'Waktu Istirahat',
                'end_date' => 'Tanggal Selesai',
            ],
            'buttons' => [
                'submit' => 'Buat Hari Kerja',
            ],
            'messages' => [
                'created' => 'Hari Kerja berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Hari Kerja: :name',
            'fields' => [
                'name' => 'Nama',
                'start_date' => 'Tanggal Mulai',
                'break_time' => 'Waktu Istirahat',
                'end_date' => 'Tanggal Selesai',
            ],
            'buttons' => [
                'submit' => 'Perbarui Hari Kerja',
            ],
            'messages' => [
                'updated' => 'Hari Kerja berhasil diperbarui!',
            ],
        ],
    ],
    'staff_management' => [
        'title' => 'Manajemen Staf',
    ],
    'divisions' => [
        'index' => [
            'title' => 'Divisi',
            'buttons' => [
                'create' => 'Buat Divisi',
            ],
            'partials' => [
                'divisions' => [
                    'messages' => [
                        'deleted' => 'Divisi berhasil dihapus!',
                    ],
                    'partials' => [
                        'divisions_table' => [
                            'headers' => [
                                'name' => 'Nama',
                            ],
                        ],
                        'divisions_card' => [
                            'headers' => [
                                'name' => 'Nama',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Divisi',
            'fields' => [
                'name' => 'Nama',
            ],
            'buttons' => [
                'submit' => 'Buat Divisi',
            ],
            'messages' => [
                'created' => 'Divisi berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Divisi: :name',
            'fields' => [
                'name' => 'Nama',
            ],
            'buttons' => [
                'submit' => 'Perbarui Divisi',
            ],
            'messages' => [
                'updated' => 'Divisi berhasil diperbarui!',
            ],
        ],
    ],
    'workshops' => [
        'index' => [
            'title' => 'Workshop',
            'buttons' => [
                'create' => 'Buat Workshop',
            ],
            'partials' => [
                'workshops' => [
                    'messages' => [
                        'deleted' => 'Workshop berhasil dihapus!',
                    ],
                    'partials' => [
                        'workshops_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'address' => 'Alamat',
                            ],
                        ],
                        'workshops_card' => [
                            'headers' => [
                                'name' => 'Nama',
                                'address' => 'Alamat : :address',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Workshop',
            'fields' => [
                'name' => 'Nama',
                'address' => 'Alamat',
            ],
            'buttons' => [
                'submit' => 'Buat Workshop',
            ],
            'messages' => [
                'created' => 'Workshop berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Workshop: :name',
            'fields' => [
                'name' => 'Nama',
                'address' => 'Alamat',
            ],
            'buttons' => [
                'submit' => 'Perbarui Workshop',
            ],
            'messages' => [
                'updated' => 'Workshop berhasil diperbarui!',
            ],
        ],
    ],
    'workstations' => [
        'index' => [
            'title' => 'Workstation',
            'buttons' => [
                'create' => 'Buat Workstation',
            ],
            'partials' => [
                'workstations' => [
                    'messages' => [
                        'deleted' => 'Workstation berhasil dihapus!',
                    ],
                    'partials' => [
                        'workstations_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'location' => 'Lokasi',
                                'workshop' => 'Workshop',
                                'division' => 'Divisi',
                            ],
                        ],
                        'workstations_card' => [
                            'headers' => [
                                'name' => 'Nama',
                                'location' => 'Lokasi: :location',
                                'workshop' => 'Workshop: :workshop',
                                'division' => 'Divisi: :division',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Workstation',
            'fields' => [
                'name' => 'Nama',
                'location' => 'Lokasi',
                'workshop' => 'Workshop',
                'division' => 'Divisi',
            ],
            'buttons' => [
                'submit' => 'Buat Workstation',
            ],
            'messages' => [
                'created' => 'Workstation berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Workstation: :name',
            'fields' => [
                'name' => 'Nama',
                'location' => 'Lokasi',
                'workshop' => 'Workshop',
                'division' => 'Divisi',
            ],
            'buttons' => [
                'submit' => 'Perbarui Workstation',
            ],
            'messages' => [
                'updated' => 'Workstation berhasil diperbarui!',
            ],
        ],
    ],
    'users' => [
        'index' => [
            'title' => 'Staf',
            'buttons' => [
                'create' => 'Buat Staf',
            ],
            'partials' => [
                'users' => [
                    'messages' => [
                        'deleted' => 'Staf berhasil dihapus!',
                    ],
                    'partials' => [
                        'users_table' => [
                            'headers' => [
                                'nip' => 'NIP',
                                'name' => 'Nama',
                                'email' => 'Email',
                                'phone_number' => 'Nomor Telepon',
                                'role' => 'Peran',
                                'workstation' => 'Workstation',
                                'step' => 'Langkah',
                                'avatar' => 'Avatar',
                            ],
                        ],
                        'users_card' => [
                            'headers' => [
                                'nip' => 'NIP: :nip',
                                'name' => 'Nama: :name',
                                'email' => 'Email: :email',
                                'phone_number' => 'Nomor Telepon: :phone_number',
                                'role' => 'Peran: :role',
                                'workstation' => 'Workstation: :workstation',
                                'step' => 'Langkah: :step',
                                'avatar' => 'Avatar',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Staf',
            'fields' => [
                'nip' => 'NIP',
                'name' => 'Nama',
                'email' => 'Email',
                'phone_number' => 'Nomor Telepon',
                'password' => 'Kata Sandi',
                'password_confirmation' => 'Konfirmasi Kata Sandi',
                'role' => 'Peran',
                'workstation' => 'Workstation',
                'workstation_placeholder' => 'Pilih Workstation',
                'step' => 'Langkah',
                'step_placeholder' => 'Pilih Langkah',
                'avatar' => 'Avatar',
                'avatar_filepond_placeholder' => 'Letakkan file di sini atau klik untuk mengunggah',
            ],
            'buttons' => [
                'submit' => 'Buat Staf',
            ],
            'messages' => [
                'created' => 'Staf berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Staf: :name',
            'fields' => [
                'nip' => 'NIP',
                'name' => 'Nama',
                'email' => 'Email',
                'phone_number' => 'Nomor Telepon',
                'password' => 'Kata Sandi',
                'password_confirmation' => 'Konfirmasi Kata Sandi',
                'role' => 'Peran',
                'workstation' => 'Workstation',
                'workstation_placeholder' => 'Pilih Workstation',
                'step' => 'Langkah',
                'step_placeholder' => 'Pilih Langkah',
                'avatar' => 'Avatar',
                'avatar_filepond_placeholder' => 'Letakkan file di sini atau klik untuk mengunggah',
            ],
            'buttons' => [
                'submit' => 'Perbarui Staf',
            ],
            'messages' => [
                'updated' => 'Staf berhasil diperbarui!',
            ],
        ],
    ],
    'access_control' => [
        'title' => 'Kontrol Akses',
    ],
    'permissions' => [
        'title' => 'Izin',
    ],
    'roles' => [
        'title' => 'Peran',
    ],
    'steps' => [
        'title' => 'Daftar Langkah',
    ],
    'raw_materials' => [
        'title' => 'Daftar Bahan Mentah',
    ],
    'components' => [
        'title' => 'Daftar Komponen',
    ],
    'panels' => [
        'title' => 'Daftar Panel',
    ],
    'projects' => [
        'title' => 'Daftar Proyek',
    ],
    'carriages' => [
        'title' => 'Daftar Gerbong',
    ],
    'settings' => [
        'title' => 'Pengaturan',
    ],
    'feedback' => [
        'title' => 'Umpan Balik',
    ],
    'helpdesk' => [
        'title' => 'Helpdesk',
    ],
];
