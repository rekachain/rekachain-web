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
        'title' => 'Bengkel',
    ],
    'workstations' => [
        'title' => 'Stasiun Kerja',
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