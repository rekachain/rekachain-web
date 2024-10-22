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
    'work_day' => [
        'index' => [
            'title' => 'Hari Kerja',
            'buttons' => [
                'create' => 'Buat Hari Kerja',
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
        'partials' => [
            'work_days' => [
                'messages' => [
                    'deleted' => 'Hari Kerja berhasil dihapus!',
                ],
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
    'staff_management' => [
        'title' => 'Manajemen Staf',
    ],
    'division' => [
        'index' => [
            'title' => 'Divisi',
            'buttons' => [
                'create' => 'Buat Divisi',
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
        'partials' => [
            'divisions' => [
                'messages' => [
                    'deleted' => 'Divisi berhasil dihapus!',
                ],
            ],
            'partials' => [
                'division_table' => [
                    'headers' => [
                        'name' => 'Nama',
                    ],
                ],
                'division_card' => [
                    'headers' => [
                        'name' => 'Nama',
                    ],
                ],
            ],
        ],
    ],
    'workshop' => [
        'index' => [
            'title' => 'Workshop',
            'buttons' => [
                'create' => 'Buat Workshop',
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
        'partials' => [
            'workshops' => [
                'messages' => [
                    'deleted' => 'Workshop berhasil dihapus!',
                ],
            ],
            'partials' => [
                'workshop_table' => [
                    'headers' => [
                        'name' => 'Nama',
                        'address' => 'Alamat',
                    ],
                ],
                'workshop_card' => [
                    'headers' => [
                        'name' => 'Nama',
                        'address' => 'Alamat : :address',
                    ],
                ],
            ],
        ],
    ],
    'workstation' => [
        'index' => [
            'title' => 'Workstation',
            'buttons' => [
                'create' => 'Buat Workstation',
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
        'partials' => [
            'workstations' => [
                'messages' => [
                    'deleted' => 'Workstation berhasil dihapus!',
                ],
            ],
            'partials' => [
                'workstation_table' => [
                    'headers' => [
                        'name' => 'Nama',
                        'location' => 'Lokasi',
                        'workshop' => 'Workshop',
                        'division' => 'Divisi',
                    ],
                ],
                'workstation_card' => [
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
    'user' => [
        'index' => [
            'title' => 'Staf',
            'buttons' => [
                'create' => 'Buat Staf',
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
        'partials' => [
            'users' => [
                'messages' => [
                    'deleted' => 'Staf berhasil dihapus!',
                ],
            ],
            'partials' => [
                'user_table' => [
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
                'user_card' => [
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
    'access_control' => [
        'title' => 'Kontrol Akses',
    ],
    'permission' => [ // CRUD belum diimplementasikan
        'index' => [
            'title' => 'Izin',
            'buttons' => [
                'create' => 'Buat Izin',
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
        'partials' => [
            'permissions' => [
                'messages' => [
                    'deleted' => 'Izin berhasil dihapus!',
                ],
            ],
            'partials' => [
                'permission_table' => [
                    'headers' => [
                        'group' => 'Grup',
                        'name' => 'Nama',
                    ],
                ],
                'permission_card' => [
                    'headers' => [
                        'group' => 'Grup',
                        'name' => 'Nama',
                    ],
                ],
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
    'project' => [
        'index' => [
            'title' => 'Proyek',
            'buttons' => [
                'create' => 'Buat Proyek',
            ],
        ],
        'create' => [
            'title' => 'Buat Proyek',
            'fields' => [
                'name' => 'Nama',
                'trainset_needed' => 'Trainset Diperlukan',
                'initial_date' => 'Tanggal Awal',
            ],
            'buttons' => [
                'submit' => 'Buat Proyek',
            ],
            'messages' => [
                'created' => 'Proyek berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Proyek: :name',
            'fields' => [
                'name' => 'Nama',
                'trainset_needed' => 'Trainset Diperlukan',
                'initial_date' => 'Tanggal Awal',
            ],
            'buttons' => [
                'submit' => 'Perbarui Proyek',
            ],
            'messages' => [
                'updated' => 'Proyek berhasil diperbarui!',
            ],
        ],
        'trainset' => [
            'index' => [
                'title' => 'Trainset',
                'initial_date' => 'Tanggal Awal :initial_date',
                'buttons' => [
                    'add_trainset' => 'Tambah Trainset',
                ],
                'messages' => [
                    'trainset_added' => 'Trainset berhasil ditambahkan!',
                ],
                'breadcrumbs' => [
                    'project' => 'Proyek :project',
                ],
                'fields' => [
                    'trainset_needed_placeholder' => 'Pilih Trainset Diperlukan',
                    'trainset_needed_error' => 'Jumlah trainset harus lebih dari 0',
                ],
            ],
            'carriage' => [
                'index' => [
                    'title' => 'Trainset',
                    'initial_date' => 'Tanggal Awal :initial_date',
                    'preset' => 'Preset :preset',
                    'status_in_progress' => 'Status: Dalam Proses',
                    'new_preset_alert' => 'Anda menggunakan preset kustom, apakah Anda ingin menyimpannya sebagai preset baru?',
                    'buttons' => [
                        'add_carriage' => 'Tambah Kereta',
                    ],
                    'messages' => [
                        'carriage_added' => 'Kereta berhasil ditambahkan!',
                    ],
                    'breadcrumbs' => [
                        'project' => 'Proyek :project',
                        'trainset' => 'Trainset :trainset',
                    ],
                    'fields' => [
                        'trainset_needed_placeholder' => 'Pilih Trainset Diperlukan',
                        'trainset_needed_error' => 'Jumlah trainset harus lebih dari 0',
                    ],
                ],
                'panel' => [
                    'index' => [
                        'title' => 'Gerbong: :name',
                        'initial_date' => 'Tanggal Awal :initial_date',
                        'preset' => 'Preset :preset',
                        'breadcrumbs' => [
                            'project' => 'Proyek :project',
                            'trainset' => 'Trainset :trainset',
                            'carriage' => 'Gerbong :carriage',
                        ],
                    ],
                    'partials' => [
                        'panels' => [
                            'messages' => [
                                'deleted' => 'Panel berhasil dihapus!',
                            ],
                        ],
                        'add_new_panel' => [
                            'messages' => [
                                'panel_added' => 'Panel berhasil ditambahkan!',
                            ],
                            'dialogs' => [
                                'fields' => [
                                    'progress' => 'Progres',
                                    'progress_placeholder' => 'Pilih Progres',
                                    'progress_search' => 'Cari Progres',
                                    'panel' => 'Panel',
                                    'panel_placeholder' => 'Pilih Panel',
                                    'panel_search' => 'Cari Panel',
                                    'new_panel_name' => 'Nama Panel Baru',
                                    'new_panel_description' => 'Deskripsi Panel Baru',
                                    'new_panel_qty' => 'Jumlah Panel Baru',
                                ],
                                'buttons' => [
                                    'add_panel' => 'Tambah Panel',
                                ],
                            ],
                            'buttons' => [
                                'add_new_panel' => 'Tambah Panel Baru',
                            ],
                        ],
                        'components' => [
                            'panel_qty' => [
                                'title' => 'Jumlah Panel',
                                'messages' => [
                                    'qty_updated' => 'Jumlah panel berhasil diperbarui!',
                                ],
                                'buttons' => [
                                    'update_qty' => 'Perbarui Jumlah',
                                ],
                            ],
                        ],
                        'partials' => [
                            'carriage_panel_table' => [
                                'headers' => [
                                    'panel' => 'Panel',
                                    'qty' => 'Jumlah',
                                    'description' => 'Deskripsi',
                                    'progress' => 'Progres',
                                ],
                            ],
                            'carriage_panel_card' => [
                                'headers' => [
                                    'panel' => 'Panel',
                                    'qty' => 'Jumlah',
                                    'description' => 'Deskripsi',
                                    'progress' => 'Progres',
                                ],
                            ],
                        ],
                    ],
                ],
                'partials' => [
                    'change_trainset_preset' => [
                        'title' => 'Ubah Preset Trainset',
                        'messages' => [
                            'changed' => 'Preset berhasil diubah!',
                            'kpm_generated' => 'KPM berhasil dihasilkan!',
                            'preset_deleted' => 'Preset berhasil dihapus!',
                        ],
                        'fields' => [
                            'preset_trainset' => 'Preset Trainset',
                            'preset_trainset_placeholder' => 'Pilih Preset Trainset',
                        ],
                        'buttons' => [
                            'change_preset' => 'Ubah Preset',
                            'delete_preset' => 'Hapus Preset',
                            'generate_kpm' => 'Hasilkan KPM',
                        ],
                        'dialogs' => [
                            'generate_kpm_title' => 'Hasilkan KPM',
                            'fields' => [
                                'source_workstation' => 'Workstation Sumber',
                                'source_workstation_search' => 'Cari Workstation Sumber',
                                'workstation' => 'Pilih Workstation',
                                'workstation_placeholder' => 'Workstation',
                                'destination_workstation' => 'Workstation Tujuan',
                                'destination_workstation_search' => 'Cari Workstation Tujuan',
                            ],
                            'buttons' => [
                                'generate_kpm' => 'Hasilkan KPM',
                                'generate_mechanic_kpm' => 'Hasilkan KPM Mekanik',
                                'generate_electric_kpm' => 'Hasilkan KPM Elektrik',
                            ],
                        ],
                    ],
                    'carriages' => [
                        'messages' => [
                            'deleted' => 'Kereta berhasil dihapus!',
                        ],
                    ],
                    'add_new_trainset_preset' => [
                        'messages' => [
                            'preset_added' => 'Preset berhasil ditambahkan!',
                        ],
                        'buttons' => [
                            'add_new_preset' => 'Tambah Preset Baru',
                        ],
                        'dialogs' => [
                            'title' => 'Tambah Preset Baru',
                            'fields' => [
                                'preset_name' => 'Nama Preset',
                            ],
                            'actions' => [
                                'saving' => 'Menyimpan Preset...',
                            ],
                            'buttons' => [
                                'submit' => 'Simpan Preset',
                            ],
                        ],
                    ],
                    'add_carriage' => [
                        'title' => 'Tambah Kereta',
                        'buttons' => [
                            'add_carriage' => 'Tambah Kereta',
                        ],
                        'messages' => [
                            'carriage_added' => 'Kereta berhasil ditambahkan!',
                        ],
                        'dialogs' => [
                            'fields' => [
                                'carriage' => 'Kereta',
                                'carriage_placeholder' => 'Pilih Kereta',
                                'carriage_search' => 'Cari Kereta',
                                'or' => 'Atau',
                                'new_carriage_qty' => 'Jumlah Kereta Baru',
                                'new_carriage_type' => 'Tipe Kereta Baru',
                                'new_carriage_description' => 'Deskripsi Kereta Baru',
                            ],
                            'actions' => [
                                'adding_carriage' => 'Menambahkan Kereta...',
                            ],
                            'buttons' => [
                                'add_carriage' => 'Tambah Kereta',
                            ],
                        ],
                    ],
                    'partials' => [
                        'carriage_table' => [
                            'headers' => [
                                'type' => 'Tipe',
                                'qty' => 'Jumlah',
                                'panels' => 'Panel',
                            ],
                            'actions' => [
                                'panels' => 'Panel',
                            ],
                        ],
                        'carriage_card' => [
                            'headers' => [
                                'type' => 'Tipe',
                                'qty' => 'Jumlah',
                                'panels' => 'Panel',
                            ],
                            'actions' => [
                                'panels' => 'Panel',
                            ],
                        ],
                    ],
                    'components' => [
                        'carriage_qty' => [
                            'title' => 'Jumlah Kereta',
                            'messages' => [
                                'updated' => 'Jumlah kereta berhasil diperbarui!',
                            ],
                            'buttons' => [
                                'submit' => 'Perbarui Jumlah',
                            ],
                        ],
                    ],
                ],
            ],
            'partials' => [
                'trainsets' => [
                    'messages' => [
                        'deleted' => 'Trainset berhasil dihapus!',
                    ],
                ],
                'custom_preset_alert' => [

                ],
                'partials' => [
                    'trainset_table' => [
                        'headers' => [
                            'name' => 'Nama',
                            'trainset_carriage' => 'Kereta Trainset',
                        ],
                        'actions' => [
                            'carriages' => 'Trainset',
                        ],
                    ],
                    'trainset_card' => [
                        'headers' => [
                            'name' => 'Nama: :name',
                            'trainset_carriage' => 'Kereta Trainset: :trainset_carriage',
                        ],
                        'actions' => [
                            'carriages' => 'Kereta',
                        ],
                    ],
                    'trainset_name' => [
                        'headers' => [
                            'name' => 'Nama',
                        ],
                        'fields' => [
                            'trainset_error' => 'Nomor trainset tidak boleh kosong',
                        ],
                        'buttons' => [
                            'submit' => 'Simpan',
                        ],
                    ],
                ],
            ],
        ],
        'partials' => [
            'projects' => [
                'messages' => [
                    'deleted' => 'Proyek berhasil dihapus!',
                ],
            ],
            'partials' => [
                'project_table' => [
                    'headers' => [
                        'name' => 'Nama',
                        'initial_date' => 'Tanggal Awal',
                        'trainset_count' => 'Jumlah Trainset',
                    ],
                    'actions' => [
                        'trainsets' => 'Trainset',
                    ],
                ],
                'project_card' => [
                    'headers' => [
                        'name' => 'Nama: :name',
                        'initial_date' => 'Tanggal Awal: :initial_date',
                        'trainset_count' => 'Jumlah Trainset: :trainset_count',
                    ],
                    'actions' => [
                        'trainsets' => 'Trainset',
                    ],
                ],
            ],
        ],
    ],
    'carriage' => [
        'index' => [
            'title' => 'Gerbong',
            'buttons' => [
                'create' => 'Buat Gerbong',
            ],
        ],
        'create' => [
            'title' => 'Buat Gerbong',
            'fields' => [
                'type' => 'Tipe',
                'description' => 'Deskripsi',
            ],
            'buttons' => [
                'submit' => 'Buat Gerbong',
            ],
            'messages' => [
                'created' => 'Gerbong berhasil dibuat!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Gerbong: :name',
            'fields' => [
                'type' => 'Tipe',
                'description' => 'Deskripsi',
            ],
            'buttons' => [
                'submit' => 'Perbarui Gerbong',
            ],
            'messages' => [
                'updated' => 'Gerbong berhasil diperbarui!',
            ],
        ],
        'partials' => [
            'carriages' => [
                'messages' => [
                    'deleted' => 'Gerbong berhasil dihapus!',
                ],
            ],
            'import' => [
                'messages' => [
                    'imported' => 'Gerbong berhasil diimpor!',
                ],
                'dialogs' => [
                    'title' => 'Impor Gerbong',
                    'description' => 'Impor Gerbong dari file Excel',
                    'fields' => [
                        'download_template' => 'Unduh Template',
                        'file' => 'File',
                    ],
                    'buttons' => [
                        'import' => 'Impor Gerbong',
                        'download_template' => 'Unduh',
                        'submit' => 'Impor Gerbong',
                        'processing' => 'Memproses...',
                    ],
                    'messages' => [
                        'imported' => 'Gerbong berhasil diimpor!',
                    ],
                ],
                'buttons' => [
                    'import' => 'Impor Gerbong',
                ],
            ],
            'partials' => [
                'carriage_table' => [
                    'headers' => [
                        'type' => 'Tipe',
                        'description' => 'Deskripsi',
                    ],
                ],
                'carriage_card' => [
                    'headers' => [
                        'type' => 'Tipe: :type',
                        'description' => 'Deskripsi: :description',
                    ],
                ],
            ],
        ],
    ],
    'settings' => [
        'title' => 'Pengaturan',
    ],
    'feedback' => [
        'index' => [
            'title' => 'Umpan Balik',
            'buttons' => [
                'create' => 'Buat Umpan Balik',
            ],
        ],
        'partials' => [
            'feedbacks' => [
                'messages' => [
                    'deleted' => 'Umpan Balik berhasil dihapus!',
                ],
            ],
            'partials' => [
                'feedback_table' => [
                    'headers' => [
                        'name' => 'Nama',
                        'email' => 'Email',
                        'rating' => 'Penilaian',
                        'message' => 'Pesan',
                        'status' => 'Status',
                    ],
                    'values' => [
                        'pending' => 'Tertunda',
                        'approved' => 'Disetujui',
                        'rejected' => 'Ditolak',
                    ],
                ],
                'feedback_card' => [
                    'headers' => [
                        'name' => 'Nama: :name',
                        'email' => 'Email: :email',
                        'rating' => 'Penilaian: :rating',
                        'message' => 'Pesan: :message',
                        'status' => 'Status: :status',
                    ],
                ],
            ],
        ],
    ],
    'helpdesk' => [
        'title' => 'Helpdesk',
    ],
    'profile' => [
        'edit' => [
            'title' => 'Edit Profil',
        ],
        'partials' => [
            'delete_user_form' => [
                'title' => 'Hapus Akun',
                'description' => 'Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen. Sebelum menghapus akun Anda, harap unduh data atau informasi yang ingin Anda simpan.',
                'dialogs' => [
                    'title' => 'Hapus Akun',
                    'description' => 'Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen. Harap masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.',
                    'fields' => [
                        'password' => 'Kata Sandi',
                        'password_placeholder' => 'Masukkan kata sandi Anda',
                    ],
                    'buttons' => [
                        'delete_account' => 'Hapus Akun',
                    ],
                ],
                'buttons' => [
                    'delete_account' => 'Hapus Akun',
                ],
            ],
            'update_password_form' => [
                'title' => 'Perbarui Kata Sandi',
                'description' => 'Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk tetap aman.',
                'fields' => [
                    'current_password' => 'Kata Sandi Saat Ini',
                    'password' => 'Kata Sandi',
                    'password_confirmation' => 'Konfirmasi Kata Sandi',
                ],
                'buttons' => [
                    'submit' => 'Perbarui Kata Sandi',
                ],
                'messages' => [
                    'updated' => 'Kata sandi berhasil diperbarui!',
                ],
            ],
            'update_profile_information_form' => [
                'title' => 'Perbarui Informasi Profil',
                'description' => 'Perbarui informasi profil dan alamat email akun Anda.',
                'fields' => [
                    'name' => 'Nama',
                    'email' => 'Email',
                    'phone_number' => 'Nomor Telepon',
                    'avatar' => 'Avatar',
                    'avatar_filepond_placeholder' => 'Letakkan file di sini atau klik untuk mengunggah',
                ],
                'buttons' => [
                    'submit' => 'Perbarui Informasi',
                    'resend_verification_email' => 'Klik di sini untuk mengirim ulang email verifikasi.',
                ],
                'messages' => [
                    'updated' => 'Informasi profil berhasil diperbarui!',
                    'verify_email' => 'Alamat email Anda belum diverifikasi.',
                    'verification_email_sent' => 'Email verifikasi baru telah dikirim ke alamat yang Anda berikan saat pendaftaran.',
                ],
            ],
        ],
    ],
];
