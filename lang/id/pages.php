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
    'staff' => [
        'title' => 'Staf',
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
