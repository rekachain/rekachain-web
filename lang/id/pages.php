<?php

return [
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
            'title' => 'Edit Hari Kerja :name',
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
        'title' => 'Divisi',
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
