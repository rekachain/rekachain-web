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
    'permissions' => [ // CRUD Belum diimplementasikan
        'index' => [
            'title' => 'Izin',
            'buttons' => [
                'create' => 'Buat Izin',
            ],
            'partials' => [
                'permissions' => [
                    'messages' => [
                        'deleted' => 'Izin berhasil dihapus!',
                    ],
                    'partials' => [
                        'permissions_table' => [
                            'headers' => [
                                'group' => 'Grup',
                                'name' => 'Nama',
                            ],
                        ],
                        'permissions_card' => [
                            'headers' => [
                                'group' => 'Grup',
                                'name' => 'Nama',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Izin',
            'fields' => [
                'name' => 'Nama',
            ],
            'buttons' => [
                'submit' => 'Buat Izin',
            ],
            'messages' => [
                'created' => 'Izin berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Izin: :name',
            'fields' => [
                'name' => 'Nama',
            ],
            'buttons' => [
                'submit' => 'Perbarui Izin',
            ],
            'messages' => [
                'updated' => 'Izin berhasil diperbarui!',
            ],
        ],
    ],
    'roles' => [ // Update belum diimplementasikan
        'index' => [
            'title' => 'Peranan',
            'buttons' => [
                'create' => 'Buat Peran',
            ],
            'partials' => [
                'roles' => [
                    'messages' => [
                        'deleted' => 'Peran berhasil dihapus!',
                    ],
                    'partials' => [
                        'roles_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'division' => 'Divisi',
                                'level' => 'Tingkat',
                                'users_count' => 'Jumlah Pengguna',
                                'permissions_count' => 'Jumlah Izin',
                            ],
                        ],
                        'roles_card' => [
                            'headers' => [
                                'name' => 'Nama: :name',
                                'division' => 'Divisi: :division',
                                'level' => 'Tingkat: :level',
                                'users_count' => 'Jumlah Pengguna: :users_count',
                                'permissions_count' => 'Jumlah Izin: :permissions_count',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Peran',
            'fields' => [
                'name' => 'Nama',
                'division' => 'Divisi',
                'division_placeholder' => 'Pilih Divisi',
                'level' => 'Tingkat',
                'permissions' => 'Izin',
            ],
            'buttons' => [
                'submit' => 'Buat Peran',
            ],
            'messages' => [
                'created' => 'Peran berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Peran: :name',
            'fields' => [
                'name' => 'Nama',
                'division' => 'Divisi',
                'division_placeholder' => 'Pilih Divisi',
                'level' => 'Tingkat',
                'permissions' => 'Izin',
            ],
            'buttons' => [
                'submit' => 'Perbarui Peran',
            ],
            'messages' => [
                'updated' => 'Peran berhasil diperbarui!',
            ],
        ],
    ],
    'steps' => [
        'index' => [
            'title' => 'Langkah',
            'buttons' => [
                'create' => 'Buat Langkah',
            ],
            'partials' => [
                'steps' => [
                    'messages' => [
                        'deleted' => 'Langkah berhasil dihapus!',
                    ],
                    'partials' => [
                        'steps_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'process' => 'Proses',
                                'estimated_manufacturing_time' => 'Perkiraan Waktu Pembuatan',
                            ],
                        ],
                        'steps_card' => [
                            'headers' => [
                                'name' => 'Nama: :name',
                                'process' => 'Proses: :process',
                                'estimated_manufacturing_time' => 'Perkiraan Waktu Pembuatan: :estimated_manufacturing_time',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Langkah',
            'fields' => [
                'progress' => 'Progres',
                'progress_placeholder' => 'Pilih Progres',
                'process' => 'Proses',
                'name' => 'Nama',
                'estimated_manufacturing_time' => 'Perkiraan Waktu Pembuatan',
            ],
            'buttons' => [
                'submit' => 'Buat Langkah',
            ],
            'messages' => [
                'created' => 'Langkah berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Langkah: :name',
            'fields' => [
                'progress' => 'Progres',
                'progress_placeholder' => 'Pilih Progres',
                'process' => 'Proses',
                'name' => 'Nama',
                'estimated_manufacturing_time' => 'Perkiraan Waktu Pembuatan',
            ],
            'buttons' => [
                'submit' => 'Perbarui Langkah',
            ],
            'messages' => [
                'updated' => 'Langkah berhasil diperbarui!',
            ],
        ],
    ],
    'raw_materials' => [
        'index' => [
            'title' => 'Bahan Baku',
            'buttons' => [
                'create' => 'Buat Bahan Baku',
            ],
            'partials' => [
                'raw_materials' => [
                    'messages' => [
                        'deleted' => 'Bahan Baku berhasil dihapus!',
                    ],
                    'partials' => [
                        'raw_materials_table' => [
                            'headers' => [
                                'material_code' => 'Kode Bahan',
                                'description' => 'Deskripsi',
                                'specs' => 'Spesifikasi',
                                'unit' => 'Satuan',
                            ],
                        ],
                        'raw_materials_card' => [
                            'headers' => [
                                'material_code' => 'Kode Bahan: :material_code',
                                'description' => 'Deskripsi: :description',
                                'specs' => 'Spesifikasi: :specs',
                                'unit' => 'Satuan: :unit',
                            ],
                        ],
                    ],
                ],
                'import' => [
                    'title' => 'Impor Bahan Baku',
                    'description' => 'Impor Bahan Baku dari file Excel',
                    'fields' => [
                        'download_template' => 'Unduh Template',
                        'file' => 'File',
                    ],
                    'buttons' => [
                        'import' => 'Impor Bahan Baku',
                        'download_template' => 'Unduh',
                        'submit' => 'Impor Bahan Baku',
                        'processing' => 'Memproses...',
                    ],
                    'messages' => [
                        'imported' => 'Bahan Baku berhasil diimpor!',
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Bahan Baku',
            'fields' => [
                'material_code' => 'Kode Bahan',
                'description' => 'Deskripsi',
                'specs' => 'Spesifikasi',
                'unit' => 'Satuan',
            ],
            'buttons' => [
                'submit' => 'Buat Bahan Baku',
            ],
            'messages' => [
                'created' => 'Bahan Baku berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Bahan Baku: :name',
            'fields' => [
                'material_code' => 'Kode Bahan',
                'description' => 'Deskripsi',
                'specs' => 'Spesifikasi',
                'unit' => 'Satuan',
            ],
            'buttons' => [
                'submit' => 'Perbarui Bahan Baku',
            ],
            'messages' => [
                'updated' => 'Bahan Baku berhasil diperbarui!',
            ],
        ],
    ],
    'components' => [
        'index' => [
            'title' => 'Komponen',
            'buttons' => [
                'create' => 'Buat Komponen',
            ],
            'partials' => [
                'components' => [
                    'messages' => [
                        'deleted' => 'Komponen berhasil dihapus!',
                    ],
                    'partials' => [
                        'components_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'progress' => 'Progres',
                            ],
                        ],
                        'components_card' => [
                            'headers' => [
                                'name' => 'Nama: :name',
                                'progress' => 'Progres: :progress',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Komponen',
            'fields' => [
                'name' => 'Nama',
                'progress' => 'Progres',
                'progress_placeholder' => 'Pilih Progres',
            ],
            'buttons' => [
                'submit' => 'Buat Komponen',
            ],
            'messages' => [
                'created' => 'Komponen berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Komponen: :name',
            'fields' => [
                'name' => 'Nama',
                'progress' => 'Progres',
                'progress_placeholder' => 'Pilih Progres',
            ],
            'buttons' => [
                'submit' => 'Perbarui Komponen',
            ],
            'messages' => [
                'updated' => 'Komponen berhasil diperbarui!',
            ],
        ],
    ],
    'panels' => [
        'index' => [
            'title' => 'Panel',
            'buttons' => [
                'create' => 'Buat Panel',
            ],
            'partials' => [
                'panels' => [
                    'messages' => [
                        'deleted' => 'Panel berhasil dihapus!',
                    ],
                    'partials' => [
                        'panels_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'description' => 'Deskripsi',
                            ],
                        ],
                        'panels_card' => [
                            'headers' => [
                                'name' => 'Nama: :name',
                                'description' => 'Deskripsi: :description',
                            ],
                        ],
                    ],
                ],
                'import' => [
                    'title' => 'Impor Panel',
                    'description' => 'Impor Panel dari file Excel',
                    'fields' => [
                        'download_template' => 'Unduh Template',
                        'file' => 'File',
                    ],
                    'buttons' => [
                        'import' => 'Impor Panel',
                        'download_template' => 'Unduh',
                        'submit' => 'Impor Panel',
                        'processing' => 'Memproses...',
                    ],
                    'messages' => [
                        'imported' => 'Panel berhasil diimpor!',
                    ],
                ],
            ],
        ],
        'create' => [
            'title' => 'Buat Panel',
            'fields' => [
                'name' => 'Nama',
                'description' => 'Deskripsi',
            ],
            'buttons' => [
                'submit' => 'Buat Panel',
            ],
            'messages' => [
                'created' => 'Panel berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Panel: :name',
            'fields' => [
                'name' => 'Nama',
                'description' => 'Deskripsi',
            ],
            'buttons' => [
                'submit' => 'Perbarui Panel',
            ],
            'messages' => [
                'updated' => 'Panel berhasil diperbarui!',
            ],
        ],
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
