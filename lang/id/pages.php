<?php

/**
 * Current structure example:
 * following directory structure
 *
 * pages
 *   - component name
 *     - fields (for form fields)
 *     - messages (for flash messages)
 *     - buttons (for button names)
 *     - actions (for action names)
 *     - dialogs (for dialog element)
 *       - messages (for messages in dialog)
 *       - buttons (for button names in dialog)
 *       - actions (for action names in dialog)
 *   - components (for page components)
 *   - partials (for page partials)
 */

return [
    'login' => [
        'title' => 'Selamat Datang Kembali!',
        'fields' => [
            'identifier' => 'NIP/Email',
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
            'project' => 'Proyek',
            'all_project' => 'Semua Proyek',
            'all_trainset_status' => 'Status Semua Trainset',
            'select_project' => 'Pilih Proyek',
            'progress_workshops' => 'Progress untuk tiap Workshop',
            'progress_panels' => 'Progress untuk tiap Panel',
            'panels_title' => 'Progress Panel pada WS Assembly',
            'all_workstations' => 'Progress Semua Workstation',
            'workstations_sub' => 'Progress dari Semua Workstation',
            'find_project' => 'Cari Proyek...',
            'project_not_found' => 'Proyek Tidak Ditemukan',
            'trainset_not_found' => 'Trainset Tidak Ditemukan',
            'find_trainset' => 'Cari Trainset...',
            'select_trainset' => 'Pilih Trainset...',
            'panel_trainset' => 'Panel Trainset',
            'panel_trainset_sub' => 'Semua Panel pada Trainset',
            'panel_progress_trainset' => 'Progress Panel Trainset ',
            'panel_progress_trainset_sub' => 'Progress Panel pada Trainset ',
        ],
    ],
    'dashboard_trainset' => [
        'index' => [
            'title' => 'Halaman Utama',
            'welcome' => 'Selamat datang di Halaman Utama',
            'project' => 'Proyek',
            'project_buyer' => 'Pesanan',
            'all_project' => 'Semua Proyek',
            'all_trainset_status' => 'Status Semua Trainset',
            'select_project' => 'Pilih Proyek',
            'progress_workshops' => 'Progress untuk tiap Workshop',
            'progress_panels' => 'Progress untuk tiap Panel',
            'panels_title' => 'Progress Panel pada WS Assembly',
            'all_workstations' => 'Progress Semua Workstation',
            'workstations_sub' => 'Progress dari Semua Workstation',
            'find_project' => 'Cari Proyek...',
            'project_not_found' => 'Proyek Tidak Ditemukan',
            'trainset_not_found' => 'Trainset Tidak Ditemukan',
            'trainset_not_progressed' => 'Trainset Belum Diproses',
            'trainset_buyer_not_found' => 'Pesanan Tidak Ditemukan',
            'trainset_buyer_not_progressed' => 'Pesanan Belum Diproses',
            'components_in_trainset_buyer' => 'Komponen dalam Pesanan',
            'components_in_trainset_buyer_sub' => 'Komponen dalam Pesanan :trainset',
            'panels_in_trainset_buyer' => 'Panel dalam Pesanan',
            'panels_in_trainset_buyer_sub' => 'Panel dalam Pesanan :trainset',
            'find_trainset' => 'Cari Trainset...',
            'select_trainset' => 'Pilih Trainset...',
            'find_trainset_buyer' => 'Cari Pesanan...',
            'select_trainset_buyer' => 'Pilih Pesanan...',
            'panel_trainset' => 'Panel Trainset',
            'panel_trainset_sub' => 'Semua Panel pada Trainset',
            'panel_progress_trainset' => 'Progress Panel Trainset ',
            'panel_progress_trainset_sub' => 'Progress Panel pada Trainset ',
            'panel_progress_trainset_desc' => 'Menunjukkan progress dari status kebutuhan panel.',
            'panel_progress_trainset_fulfilled' => 'Kebutuhan Panel Terpenuhi',
            'panel_progress_trainset_not_fulfilled' => 'Kebutuhan Panel Sejumlah :total Masih Belum Terpenuhi',
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
                'password_placeholder' => 'Kosongkan jika tidak ingin mengganti kata sandi',
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
                'filters' => [
                    'worker_status' => [
                        'title' => 'Status Pekerja',
                        'fields' => [
                            'all' => 'Semua',
                            'active' => 'Aktif',
                            'inactive' => 'Tidak Aktif',
                        ],
                    ],
                ],
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
    'role' => [ // Update belum diimplementasikan
        'index' => [
            'title' => 'Peranan',
            'buttons' => [
                'create' => 'Buat Peran',
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
        'partials' => [
            'roles' => [
                'messages' => [
                    'deleted' => 'Peran berhasil dihapus!',
                ],
            ],
            'partials' => [
                'role_table' => [
                    'headers' => [
                        'name' => 'Nama',
                        'division' => 'Divisi',
                        'level' => 'Tingkat',
                        'users_count' => 'Jumlah Pengguna',
                        'permissions_count' => 'Jumlah Izin',
                    ],
                ],
                'role_card' => [
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
    'step' => [
        'index' => [
            'title' => 'Langkah',
            'buttons' => [
                'create' => 'Buat Langkah',
            ],
        ],
        'create' => [
            'title' => 'Buat Langkah',
            'fields' => [
                'progress' => 'Progres',
                'progress_placeholder' => 'Pilih Progres',
                'process' => 'Proses',
                'name' => 'Nama',
                'estimated_manufacturing_time' => 'Perkiraan Waktu Produksi (Menit)',
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
                'estimated_manufacturing_time' => 'Perkiraan Waktu Produksi (Menit)',
            ],
            'buttons' => [
                'submit' => 'Perbarui Langkah',
            ],
            'messages' => [
                'updated' => 'Langkah berhasil diperbarui!',
            ],
        ],
        'partials' => [
            'steps' => [
                'messages' => [
                    'deleted' => 'Langkah berhasil dihapus!',
                ],
            ],
            'partials' => [
                'step_table' => [
                    'headers' => [
                        'name' => 'Nama',
                        'process' => 'Proses',
                        'estimated_manufacturing_time' => 'Perkiraan Waktu Produksi (Menit)',
                    ],
                ],
                'step_card' => [
                    'headers' => [
                        'name' => 'Nama: :name',
                        'process' => 'Proses: :process',
                        'estimated_manufacturing_time' => 'Perkiraan Waktu Produksi: :estimated_manufacturing_time Menit',
                    ],
                ],
            ],
        ],
    ],
    'raw_material' => [
        'index' => [
            'title' => 'Bahan Baku',
            'buttons' => [
                'create' => 'Buat Bahan Baku',
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
        'partials' => [
            'raw_materials' => [
                'messages' => [
                    'deleted' => 'Bahan Baku berhasil dihapus!',
                ],
            ],
            'import' => [
                'buttons' => [
                    'import' => 'Impor Bahan Baku',
                ],
                'messages' => [
                    'imported' => 'Bahan Baku berhasil diimpor!',
                ],
                'dialogs' => [
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
                ],
            ],
            'partials' => [
                'raw_material_table' => [
                    'headers' => [
                        'material_code' => 'Kode Bahan',
                        'description' => 'Deskripsi',
                        'specs' => 'Spesifikasi',
                        'unit' => 'Satuan',
                    ],
                ],
                'raw_material_card' => [
                    'headers' => [
                        'material_code' => 'Kode Bahan: :material_code',
                        'description' => 'Deskripsi: :description',
                        'specs' => 'Spesifikasi: :specs',
                        'unit' => 'Satuan: :unit',
                    ],
                ],
            ],
        ],
    ],
    'component' => [
        'index' => [
            'title' => 'Komponen',
            'buttons' => [
                'create' => 'Buat Komponen',
            ],
        ],
        'create' => [
            'title' => 'Buat Komponen',
            'fields' => [
                'name' => 'Nama',
                'description' => 'Deskripsi',
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
                'description' => 'Deskripsi',
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
        'partials' => [
            'components' => [
                'messages' => [
                    'deleted' => 'Komponen berhasil dihapus!',
                ],
            ],
            'partials' => [
                'component_table' => [
                    'headers' => [
                        'name' => 'Nama',
                        'description' => 'Deskripsi',
                        'progress' => 'Progres',
                    ],
                ],
                'component_card' => [
                    'headers' => [
                        'name' => 'Nama: :name',
                        'description' => 'Deskripsi: :description',
                        'progress' => 'Progres: :progress',
                    ],
                ],
            ],
        ],
    ],
    'panel' => [
        'index' => [
            'title' => 'Panel',
            'buttons' => [
                'create' => 'Buat Panel',
            ],
        ],
        'create' => [
            'title' => 'Buat Panel',
            'fields' => [
                'name' => 'Nama',
                'description' => 'Deskripsi',
                'progress' => 'Progress',
                'progress_placeholder' => 'Pilih Progress',
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
                'progress' => 'Progress',
                'progress_placeholder' => 'Pilih Progress',
            ],
            'buttons' => [
                'submit' => 'Perbarui Panel',
            ],
            'messages' => [
                'updated' => 'Panel berhasil diperbarui!',
            ],
        ],
        'partials' => [
            'panels' => [
                'messages' => [
                    'deleted' => 'Panel berhasil dihapus!',
                ],
            ],
            'import' => [
                'title' => 'Impor Panel',
                'description' => 'Impor Panel dari file Excel',
                'messages' => [
                    'imported' => 'Panel berhasil diimpor!',
                ],
                'buttons' => [
                    'import' => 'Impor Panel',
                ],
                'dialogs' => [
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
                ],
            ],
            'partials' => [
                'panel_table' => [
                    'headers' => [
                        'name' => 'Nama',
                        'description' => 'Deskripsi',
                        'progress' => 'Progress',
                    ],
                ],
                'panel_card' => [
                    'headers' => [
                        'name' => 'Nama: :name',
                        'description' => 'Deskripsi: :description',
                        'progress' => 'Progress: :progress',
                    ],
                ],
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
                'description' => 'Deskripsi',
                'trainset_needed' => 'Trainset Diperlukan',
                'initial_date' => 'Tanggal Awal',
                'estimated_start_date' => 'Estimasi Tanggal Mulai (OPSIONAL)',
                'estimated_end_date' => 'Estimasi Tanggal Selesai (OPSIONAL)',
                'buyer_selection' => 'Pembeli (OPSIONAL)',
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
                'description' => 'Deskripsi',
                'trainset_needed' => 'Trainset Diperlukan',
                'initial_date' => 'Tanggal Awal',
                'estimated_start_date' => 'Estimasi Tanggal Mulai (OPSIONAL)',
                'estimated_end_date' => 'Estimasi Tanggal Selesai (OPSIONAL)',
                'buyer_selection' => 'Pembeli (OPSIONAL)',
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
                    'home' => 'Beranda',
                    'project' => 'Proyek :project',
                ],
                'fields' => [
                    'trainset_needed_placeholder' => 'Pilih Trainset Diperlukan',
                    'trainset_needed_error' => 'Jumlah trainset harus lebih dari 0',
                ],
            ],
            'carriage_trainset' => [
                'index' => [
                    'title' => 'Trainset',
                    'initial_date' => 'Tanggal Awal :initial_date',
                    'preset' => 'Preset :preset',
                    'status_in_progress' => 'Status: Dalam Proses',
                    'new_preset_alert' => 'Anda menggunakan preset kustom, apakah Anda ingin menyimpannya sebagai preset baru?',
                    'buttons' => [
                        'add_carriage' => 'Tambah Kereta',
                        'export_serial_numbers' => 'Ekspor Nomor Seri',
                    ],
                    'messages' => [
                        'carriage_added' => 'Kereta berhasil ditambahkan!',
                    ],
                    'dialogs' => [
                        'export_serial_numbers' => [
                            'confirmations' => [
                                'title' => 'Apakah Anda yakin?',
                                'text' => 'Proses ini akan membutuhkan waktu beberapa saat.',
                            ],
                        ],
                    ],
                    'breadcrumbs' => [
                        'home' => 'Beranda',
                        'project' => 'Proyek :project',
                        'trainset' => 'Trainset :trainset',
                    ],
                    'fields' => [
                        'trainset_needed_placeholder' => 'Pilih Trainset Diperlukan',
                        'trainset_needed_error' => 'Jumlah trainset harus lebih dari 0',
                    ],
                ],
                'carriage_panel' => [
                    'index' => [
                        'title' => 'Gerbong: :name',
                        'initial_date' => 'Tanggal Awal :initial_date',
                        'preset' => 'Preset :preset',
                        'breadcrumbs' => [
                            'home' => 'Beranda',
                            'project' => 'Proyek :project',
                            'trainset' => 'Trainset :trainset',
                            'carriage' => 'Gerbong :carriage',
                        ],
                    ],
                    'panel_material' => [
                        'index' => [
                            'title' => 'Material Panel',
                            'breadcrumbs' => [
                                'home' => 'Beranda',
                                'project' => 'Proyek :project',
                                'trainset' => 'Trainset :trainset',
                                'carriage' => 'Gerbong :carriage',
                                'panel' => 'Panel :panel',
                            ],
                        ],
                        'partials' => [
                            'panel_materials' => [
                                'messages' => [
                                    'deleted' => 'Material Panel berhasil dihapus!',
                                ],
                            ],
                            'add_new_panel_raw_material' => [
                                'messages' => [
                                    'panel_material_added' => 'Material Panel berhasil ditambahkan!',
                                ],
                                'buttons' => [
                                    'add_new_panel_raw_material' => 'Tambah Material Panel Baru',
                                ],
                                'dialogs' => [
                                    'title' => 'Tambah Material Panel Baru',
                                    'fields' => [
                                        'raw_material' => 'Bahan Mentah',
                                        'raw_material_placeholder' => 'Pilih Bahan Mentah',
                                        'raw_material_code' => 'Kode Bahan Mentah',
                                        'raw_material_code_placeholder' => 'Kode Bahan Mentah',
                                        'raw_material_search' => 'Cari Bahan Mentah',
                                        'new_raw_material_code' => 'Kode Bahan Mentah Baru',
                                        'new_raw_material_description' => 'Deskripsi Bahan Mentah Baru',
                                        'new_raw_material_unit' => 'Satuan Bahan Mentah Baru',
                                        'new_raw_material_specs' => 'Spesifikasi Bahan Mentah Baru',
                                        'new_raw_material_qty' => 'Jumlah Bahan Mentah Baru',
                                    ],
                                    'actions' => [
                                        'adding_panel_material' => 'Menambahkan Material Panel...',
                                    ],
                                    'buttons' => [
                                        'add_panel_material' => 'Tambah Material Panel',
                                    ],
                                ],
                            ],
                            'partials' => [
                                'panel_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Kode Material',
                                        'qty' => 'Jumlah',
                                        'description' => 'Deskripsi',
                                    ],
                                ],
                                'components' => [
                                    'panel_material_qty' => [
                                        'title' => 'Jumlah Material Panel',
                                        'messages' => [
                                            'updated' => 'Jumlah Material Panel berhasil diperbarui!',
                                        ],
                                        'buttons' => [
                                            'update_qty' => 'Perbarui Jumlah',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'carriage_panel_component' => [
                        'index' => [
                            'title' => 'Komponen',
                            'breadcrumbs' => [
                                'home' => 'Beranda',
                                'project' => 'Proyek :project',
                                'trainset' => 'Trainset :trainset',
                                'carriage' => 'Gerbong :carriage',
                                'panel' => 'Panel :panel',
                            ],
                        ],
                        'component_material' => [
                            'index' => [
                                'title' => 'Material Komponen',
                                'breadcrumbs' => [
                                    'home' => 'Beranda',
                                    'project' => 'Proyek :project',
                                    'trainset' => 'Trainset :trainset',
                                    'carriage' => 'Gerbong :carriage',
                                    'panel' => 'Panel :panel',
                                    'component' => 'Komponen :component',
                                ],
                            ],
                            'partials' => [
                                'component_materials' => [
                                    'messages' => [
                                        'deleted' => 'Material Komponen berhasil dihapus!',
                                    ],
                                ],
                                'add_new_component_raw_material' => [
                                    'messages' => [
                                        'created' => 'Material Komponen berhasil ditambahkan!',
                                    ],
                                    'buttons' => [
                                        'add_new_component_raw_material' => 'Tambah Material Komponen Baru',
                                    ],
                                    'dialogs' => [
                                        'title' => 'Tambah Material Komponen Baru',
                                        'fields' => [
                                            'raw_material' => 'Bahan Mentah',
                                            'raw_material_placeholder' => 'Pilih Bahan Mentah',
                                            'raw_material_code' => 'Kode Bahan Mentah',
                                            'raw_material_code_placeholder' => 'Kode Bahan Mentah',
                                            'raw_material_search' => 'Cari Bahan Mentah',
                                            'new_raw_material_code' => 'Kode Bahan Mentah Baru',
                                            'new_raw_material_description' => 'Deskripsi Bahan Mentah Baru',
                                            'new_raw_material_unit' => 'Satuan Bahan Mentah Baru',
                                            'new_raw_material_specs' => 'Spesifikasi Bahan Mentah Baru',
                                            'new_raw_material_qty' => 'Jumlah Bahan Mentah Baru',
                                        ],
                                        'buttons' => [
                                            'add_component_material' => 'Tambah Material Komponen',
                                        ],
                                    ],
                                ],
                                'partials' => [
                                    'component_material_table' => [
                                        'headers' => [
                                            'material_code' => 'Kode Material',
                                            'qty' => 'Jumlah',
                                            'description' => 'Deskripsi',
                                        ],
                                    ],
                                    'components' => [
                                        'component_material_qty' => [
                                            'title' => 'Jumlah Material Komponen',
                                            'messages' => [
                                                'updated' => 'Jumlah Material Komponen berhasil diperbarui!',
                                            ],
                                            'buttons' => [
                                                'update_qty' => 'Perbarui Jumlah',
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'partials' => [
                            'add_new_component' => [
                                'buttons' => [
                                    'add_component' => 'Tambah Komponen',
                                ],
                                'dialogs' => [
                                    'fields' => [
                                        'progress' => 'Progres',
                                        'progress_search_placeholder' => 'Cari Progres',
                                        'progress_placeholder' => 'Pilih Progres',
                                        'component' => 'Komponen',
                                        'component_placeholder' => 'Pilih Komponen',
                                        'component_name' => 'Nama Komponen',
                                        'component_description' => 'Deskripsi Komponen',
                                        'component_qty' => 'Jumlah Komponen',
                                    ],
                                ],
                                'messages' => [
                                    'created' => 'Komponen berhasil ditambahkan!',
                                ],
                            ],
                            'carriage_panel_component_table' => [
                                'headers' => [
                                    'component' => 'Komponen',
                                    'qty' => 'Jumlah',
                                    'description' => 'Deskripsi',
                                    'progress' => 'Progres',
                                ],
                                'actions' => [
                                    'materials' => 'Material',
                                ],
                            ],
                            'carriage_panel_components' => [
                                'messages' => [
                                    'deleted' => 'Komponen berhasil dihapus!',
                                ],
                            ],
                            'partials' => [
                                'carriage_panel_component_table' => [
                                    'headers' => [
                                        'component' => 'Komponen',
                                        'qty' => 'Jumlah',
                                        'description' => 'Deskripsi',
                                        'progress' => 'Progres',
                                    ],
                                    'actions' => [
                                        'materials' => 'Material',
                                    ],
                                ],
                                'carriage_panel_component_card' => [
                                    'actions' => [
                                        'materials' => 'Material',
                                    ],
                                ],
                                'components' => [
                                    'carriage_panel_component_qty' => [
                                        'messages' => [
                                            'updated' => 'Jumlah komponen berhasil diperbarui!',
                                        ],
                                        'buttons' => [
                                            'update_qty' => 'Perbarui Jumlah',
                                        ],
                                    ],
                                    'carriage_panel_component_progress' => [
                                        'buttons' => [
                                            'progress' => 'Progres',
                                        ],
                                        'accordions' => [
                                            'progress' => 'Progres',
                                            'progress_steps' => 'Langkah Progres',
                                        ],
                                    ],
                                    'partials' => [
                                        'carriage_panel_component_progress' => [
                                            'fields' => [
                                                'progress' => 'Progres',
                                                'progress_search_placeholder' => 'Cari Progres',
                                                'progress_placeholder' => 'Pilih Progres',
                                                'progress_name' => 'Nama Progres',
                                                'work_aspect' => 'Aspek Pekerjaan',
                                                'work_aspect_placeholder' => 'Pilih Aspek Pekerjaan',
                                                'panel_component_qty' => 'Jumlah Komponen Panel',
                                            ],
                                            'messages' => [
                                                'updated' => 'Progres panel berhasil diperbarui!',
                                            ],
                                        ],
                                        'carriage_panel_component_progress_steps' => [
                                            'messages' => [
                                                'updated' => 'Langkah progres berhasil diperbarui!',
                                                'deleted' => 'Langkah progres berhasil dihapus!',
                                            ],
                                            'fields' => [
                                                'step' => 'Langkah',
                                                'step_placeholder' => 'Pilih Langkah',
                                                'name' => 'Nama',
                                                'name_placeholder' => 'Masukkan Nama Langkah',
                                                'process' => 'Proses',
                                                'process_placeholder' => 'Masukkan Proses Langkah',
                                                'estimated_time' => 'Waktu Perkiraan (Menit)',
                                                'estimated_time_placeholder' => 'Masukkan Waktu Perkiraan',
                                            ],
                                            'buttons' => [
                                                'add_step' => 'Tambah Langkah',
                                            ],
                                        ],
                                    ],
                                ],
                            ],
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
                        'partials' => [
                            'carriage_panel_table' => [
                                'headers' => [
                                    'panel' => 'Panel',
                                    'qty' => 'Jumlah',
                                    'description' => 'Deskripsi',
                                    'components' => 'Komponen',
                                    'progress' => 'Progres',
                                ],
                            ],
                            'carriage_panel_card' => [
                                'headers' => [
                                    'panel' => 'Panel',
                                    'qty' => 'Jumlah',
                                    'description' => 'Deskripsi',
                                    'components' => 'Komponen',
                                    'progress' => 'Progres',
                                ],
                            ],
                            'components' => [
                                'panel_qty' => [
                                    'title' => 'Jumlah Panel',
                                    'messages' => [
                                        'updated' => 'Jumlah panel berhasil diperbarui!',
                                    ],
                                    'buttons' => [
                                        'update_qty' => 'Perbarui Jumlah',
                                    ],
                                ],
                                'panel_progress' => [
                                    'accordions' => [
                                        'progress' => 'Progress',
                                        'progress_steps' => 'Langkah Progress',
                                    ],
                                    'messages' => [
                                        'updated' => 'Progress panel berhasil diperbarui!',
                                    ],
                                    'buttons' => [
                                        'progress' => 'Progress',
                                    ],
                                ],
                                'partials' => [
                                    'panel_progress' => [
                                        'buttons' => [
                                            'progress' => 'Progress',
                                        ],
                                        'accordions' => [
                                            'progress' => 'Progress',
                                            'progress_steps' => 'Langkah Progress',
                                        ],
                                        'messages' => [
                                            'updated' => 'Progress panel berhasil diperbarui!',
                                        ],
                                        'fields' => [
                                            'progress' => 'Progress',
                                            'progress_placeholder' => 'Pilih Progress',
                                            'name' => 'Nama',
                                            'work_aspect' => 'Aspek Pekerjaan',
                                            'work_aspect_placeholder' => 'Pilih Aspek Pekerjaan',
                                        ],
                                        'separators' => [
                                            'create_new_progress' => 'Buat Progres Baru',
                                        ],
                                    ],
                                    'panel_progress_steps' => [
                                        'messages' => [
                                            'updated' => 'Langkah progres berhasil diperbarui!',
                                            'deleted' => 'Langkah progres berhasil dihapus!',
                                        ],
                                        'fields' => [
                                            'step' => 'Langkah',
                                            'step_placeholder' => 'Pilih Langkah',
                                            'name' => 'Nama',
                                            'name_placeholder' => 'Masukkan Nama Langkah',
                                            'process' => 'Proses',
                                            'process_placeholder' => 'Masukkan Proses Langkah',
                                            'estimated_time' => 'Waktu Perkiraan (Menit)',
                                            'estimated_time_placeholder' => 'Masukkan Waktu Perkiraan',
                                        ],
                                        'buttons' => [
                                            'add_step' => 'Tambah Langkah',
                                        ],
                                    ],
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
                    ],
                    'generate_attachment' => [
                        'buttons' => [
                            'generate_attachment' => 'Buat KPM',
                        ],
                        'messages' => [
                            'attachment_generated' => 'KPM berhasil dibuat!',
                            'attachment_not_generated' => 'KPM gagal dibuat!',
                        ],
                        'dialogs' => [
                            'generate_attachment_title' => 'Buat KPM',
                            'confirm_generate_attachment_raw_materials' => 'Konfirmasi bahan baku.',
                            'confirm_generate_attachment_raw_materials_description' => 'Konfirmasi bahan baku yang tertera di bawah ini.',
                            'fields' => [
                                'source_workstation' => 'Workstation Sumber',
                                'source_workstation_placeholder' => 'Pilih Workstation Sumber',
                                'source_workstation_search' => 'Cari Workstation Sumber',
                                'workstation' => 'Pilih Workstation',
                                'workstation_placeholder' => 'Workstation',
                                'destination_workstation' => 'Workstation Tujuan',
                                'destination_workstation_placeholder' => 'Pilih Workstation Tujuan',
                                'destination_workstation_search' => 'Cari Workstation Tujuan',
                            ],
                            'buttons' => [
                                'generate_attachment' => 'Buat KPM',
                                'generate_mechanic_kpm' => 'Buat KPM Mekanik',
                                'generate_electric_kpm' => 'Buat KPM Elektrik',
                                'trainset_attachment_mechanic' => 'Mekanik',
                                'trainset_attachment_electric' => 'Elektrik',
                                'panel_attachment' => 'Panel (Assembly)',
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
                    'preview_attachments' => [
                        'dialogs' => [
                            'buttons' => [
                                'view_detail_attachment' => 'Lihat Detail KPM',
                                'mechanic_attachment' => 'KPM Mekanik',
                                'electric_attachment' => 'KPM Elektrik',
                                'panel_attachment' => 'KPM Panel',
                            ],
                            'components' => [
                                'preview_trainset_attachment' => [
                                    'props' => [
                                        'title' => 'KPM Trainset',
                                    ],
                                ],
                                'preview_panel_attachment' => [
                                    'props' => [
                                        'title' => 'KPM Panel',
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'progress_attachments' => [
                        'dialogs' => [
                            'buttons' => [
                                'trigger' => 'Progres Trainset',
                            ],
                            'components' => [
                                'tabs' => [
                                    'props' => [
                                        'tab_list' => [
                                            'mechanic' => 'Progres Mekanik',
                                            'electric' => 'Progres Elektrik',
                                            'assembly' => 'Progres Assembly',
                                        ],
                                        'tab_content' => [
                                            'title' => [
                                                'mechanic' => 'Progres Mekanik Untuk Trainset :trainset',
                                                'electric' => 'Progres Elektrik Untuk Trainset :trainset',
                                                'assembly' => 'Progres Assembly Untuk Trainset :trainset',
                                            ],
                                        ],
                                    ],
                                ],
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
                        'preview_panel_attachment' => [
                            'buttons' => [
                                'download' => 'Unduh Lampiran',
                            ],
                            'dialogs' => [
                                'title' => 'KPM Panel',
                                'messages' => [
                                    'no_attachments' => 'Tidak ada lampiran yang ditemukan.',
                                ],
                                'headers' => [
                                    'handlers' => 'Penanggung Jawab',
                                    'attachment_number' => 'Nomor Lampiran',
                                    'reservation_number' => 'Nomor Reservasi',
                                    'serial_number' => 'Nomor Seri',
                                    'reference_number' => 'Nomor Referensi',
                                    'date' => 'Tanggal',
                                    'material_list' => 'Daftar Material',
                                ],
                                'fields' => [
                                    'carriage' => 'Gerbong',
                                    'carriage_placeholder' => 'Pilih Gerbong',
                                    'panel' => 'Panel',
                                    'panel_placeholder' => 'Pilih Panel',
                                ],
                                'buttons' => [
                                    'print_qr' => 'Cetak QR',
                                ],
                                'raw_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Kode Material',
                                        'description' => 'Deskripsi',
                                        'specs' => 'Spesifikasi',
                                        'unit' => 'Satuan',
                                        'total_qty' => 'Total',
                                    ],
                                    'others' => [
                                        'captions' => [
                                            'list_material_within_attachment' => 'Daftar Material dalam Lampiran',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'preview_trainset_attachment' => [
                            'buttons' => [
                                'download' => 'Unduh Lampiran',
                            ],
                            'dialogs' => [
                                'title' => 'Lampiran Trainset',
                                'headers' => [
                                    'handlers' => 'Penanggung Jawab',
                                    'attachment_number' => 'Nomor Lampiran',
                                    'reservation_number' => 'Nomor Reservasi',
                                    'serial_number' => 'Nomor Seri',
                                    'reference_number' => 'Nomor Referensi',
                                    'date' => 'Tanggal',
                                    'material_list' => 'Daftar Material',
                                ],
                                'fields' => [
                                    'carriage' => 'Gerbong',
                                    'carriage_placeholder' => 'Pilih Gerbong',
                                    'panel' => 'Panel',
                                    'panel_placeholder' => 'Pilih Panel',
                                ],
                                'buttons' => [
                                    'print_qr' => 'Cetak QR',
                                ],
                                'raw_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Kode Material',
                                        'description' => 'Deskripsi',
                                        'specs' => 'Spesifikasi',
                                        'unit' => 'Satuan',
                                        'total_qty' => 'Total',
                                    ],
                                    'others' => [
                                        'captions' => [
                                            'list_material_within_attachment' => 'Daftar Material dalam Lampiran Trainset',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'preview_generate_panel_attachment' => [
                            'dialogs' => [
                                'title' => 'Lampiran Panel',
                                'messages' => [
                                    'no_materials' => 'Tidak ada bahan baku yang ditemukan untuk panel dan gerbong yang dipilih.',
                                ],
                                'headers' => [
                                    'material_list' => 'Daftar Material',
                                ],
                                'fields' => [
                                    'carriage' => 'Gerbong',
                                    'carriage_placeholder' => 'Pilih Gerbong',
                                    'panel' => 'Panel',
                                    'panel_placeholder' => 'Pilih Panel',
                                ],
                                'raw_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Kode Material',
                                        'description' => 'Deskripsi',
                                        'specs' => 'Spesifikasi',
                                        'unit' => 'Satuan',
                                        'total_qty' => 'Total Jumlah',
                                    ],
                                    'others' => [
                                        'captions' => [
                                            'list_material_within_attachment' => 'Daftar Material dalam Lampiran',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'preview_generate_trainset_attachment' => [
                            'messages' => [
                                'no_materials' => 'Tidak ada bahan baku yang ditemukan untuk panel dan gerbong yang dipilih.',
                            ],
                            'dialogs' => [
                                'title' => 'Lampiran Trainset',
                                'raw_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Kode Material',
                                        'description' => 'Deskripsi',
                                        'specs' => 'Spesifikasi',
                                        'unit' => 'Satuan',
                                        'total_qty' => 'Total Jumlah',
                                    ],
                                    'others' => [
                                        'captions' => [
                                            'list_material_within_attachment' => 'Daftar Material dalam Lampiran Trainset',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'progress_component' => [
                            'props' => [
                                'none' => 'Tidak Ada Progres Ditemukan (:status)',
                                'trainset' => 'Trainset: :trainset',
                                'component' => 'Komponen: :component',
                                'component_placeholder' => 'Pilih Komponen',
                                'select_all_components' => 'Semua Komponen',
                                'panel' => 'Panel: :panel',
                                'carriage' => 'Gerbong: :carriage',
                                'workers' => 'Pekerja:',
                            ],
                        ],
                        'progress_panel' => [
                            'props' => [
                                'none' => 'Tidak Ada Progres Ditemukan',
                                'trainset' => 'Trainset: :trainset',
                                'panel' => 'Panel: :panel',
                                'carriage' => 'Gerbong: :carriage',
                                'serial_number' => 'Nomor Serial: :serial_number',
                                'product_number' => 'Nomor Produk: :product_number',
                                'workers' => 'Pekerja:',
                            ],
                        ],
                        'components' => [
                            'worker_card' => [
                                'worker_identification' => 'NIP: :worker_identification',
                                'acceptance_status' => 'Status Penerimaan',
                                'work_status' => 'Status Kerja',
                                'start_at' => 'Dimulai Pada',
                            ],
                            'worker_step_card' => [
                                'step_status' => 'Status',
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
                            'carriages' => 'Gerbong',
                            'components' => 'Komponen',
                            'panels' => 'Panel',
                        ],
                    ],
                    'trainset_card' => [
                        'headers' => [
                            'name' => 'Nama: :name',
                            'trainset_carriage' => 'Kereta Trainset: :trainset_carriage',
                        ],
                        'actions' => [
                            'carriages' => 'Gerbong',
                        ],
                    ],
                    'components' => [
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
        ],
        'panel' => [
            'index' => [
                'title' => 'Panel',
                'initial_date' => 'Tanggal Awal :initial_date',
                'preset' => 'Preset :preset',
                'breadcrumbs' => [
                    'home' => 'Beranda',
                    'project' => 'Proyek :project',
                    'panels' => 'Panel',
                ],
            ],
            'partials' => [
                'panels' => [
                    'messages' => [
                        'deleted' => 'Panel berhasil dihapus!',
                    ],
                ],
                'import' => [
                    'buttons' => [
                        'import' => 'Impor Panel',
                    ],
                    'messages' => [
                        'imported' => 'Panel berhasil diimpor!',
                    ],
                    'dialogs' => [
                        'title' => 'Impor Panel',
                        'description' => 'Impor data progres dan bahan mentah dari :panel_name pada Proyek :project_name.',
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
                    ],
                ],
                'partials' => [
                    'panel_table' => [
                        'headers' => [
                            'name' => 'Nama',
                            'description' => 'Deskripsi',
                            'total_qty' => 'Jumlah Total',
                        ],
                    ],
                    'panel_card' => [
                        'headers' => [
                            'name' => 'Nama: :name',
                            'description' => 'Deskripsi: :description',
                            'total_qty' => 'Jumlah Total: :total_qty',
                        ],
                    ],
                ],
            ],
        ],
        'carriage' => [
            'index' => [
                'title' => 'Kereta',
                'initial_date' => 'Tanggal Inisiasi :initial_date',
                'preset' => 'Preset :preset',
                'breadcrumbs' => [
                    'home' => 'Beranda',
                    'project' => 'Proyek :project',
                    'carriages' => 'Kereta',
                ],
            ],
            'component' => [
                'index' => [
                    'title' => 'Komponen',
                    'initial_date' => 'Tanggal Inisiasi :initial_date',
                    'preset' => 'Preset :preset',
                    'breadcrumbs' => [
                        'home' => 'Beranda',
                        'project' => 'Proyek :project',
                        'carriage' => 'Kereta :carriage',
                        'components' => 'Komponen',
                    ],
                ],
                'partials' => [
                    'components' => [
                        'messages' => [
                            'deleted' => 'Komponen berhasil dihapus!',
                        ],
                    ],
                    'import' => [
                        'buttons' => [
                            'import' => 'Impor Komponen',
                        ],
                        'messages' => [
                            'imported' => 'Komponen berhasil diimpor!',
                        ],
                        'dialogs' => [
                            'title' => 'Impor Komponen',
                            'description' => 'Impor data progres dan bahan mentah dari :component_name pada Proyek :project_name.',
                            'description_already_has_material' => 'Komponen ini sudah memiliki bahan mentah',
                            'fields' => [
                                'download_template' => 'Unduh Template',
                                'file' => 'File',
                                'work_aspect' => 'Sisi Kerja',
                                'override' => 'Pilih Opsi Impor',
                                'override_default' => 'Impor Ulang',
                                'override_override' => 'Timpa',
                                'override_merge' => 'Gabung',
                            ],
                            'buttons' => [
                                'import' => 'Impor Komponen',
                                'download_template' => 'Unduh',
                                'submit' => 'Impor Komponen',
                                'processing' => 'Memproses...',
                            ],
                        ],
                    ],
                    'partials' => [
                        'component_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'description' => 'Deskripsi',
                                'total_qty' => 'Jumlah Total',
                            ],
                        ],
                        'component_card' => [
                            'headers' => [
                                'name' => 'Nama: :name',
                                'description' => 'Deskripsi: :description',
                                'total_qty' => 'Jumlah Total: :total_qty',
                            ],
                        ],
                    ],
                ],
            ],
            'panel' => [
                'index' => [
                    'title' => 'Panel',
                    'initial_date' => 'Tanggal Awal :initial_date',
                    'preset' => 'Preset :preset',
                    'breadcrumbs' => [
                        'home' => 'Beranda',
                        'project' => 'Proyek :project',
                        'carriage' => 'Kereta :carriage',
                        'panels' => 'Panel',
                    ],
                ],
                'partials' => [
                    'panels' => [
                        'messages' => [
                            'deleted' => 'Panel berhasil dihapus!',
                        ],
                    ],
                    'import' => [
                        'buttons' => [
                            'import' => 'Impor Panel',
                        ],
                        'messages' => [
                            'imported' => 'Panel berhasil diimpor!',
                        ],
                        'dialogs' => [
                            'title' => 'Impor Panel',
                            'description' => 'Impor data progres dan bahan mentah dari :panel_name pada Proyek :project_name.',
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
                        ],
                    ],
                    'partials' => [
                        'panel_table' => [
                            'headers' => [
                                'name' => 'Nama',
                                'description' => 'Deskripsi',
                                'total_qty' => 'Jumlah Total',
                            ],
                        ],
                        'panel_card' => [
                            'headers' => [
                                'name' => 'Nama: :name',
                                'description' => 'Deskripsi: :description',
                                'total_qty' => 'Jumlah Total: :total_qty',
                            ],
                        ],
                    ],
                ],
            ],
            'partials' => [
                'carriages' => [
                    'messages' => [
                        'deleted' => 'Kereta berhasil dihapus!',
                    ],
                ],
                'import' => [
                    'buttons' => [
                        'import' => 'Impor Kereta',
                    ],
                    'messages' => [
                        'imported' => 'Kereta berhasil diimpor!',
                    ],
                    'dialogs' => [
                        'title' => 'Impor Kereta',
                        'description' => 'Impor data progres dan bahan mentah dari :carriage_name pada Proyek :project_name.',
                        'fields' => [
                            'download_template' => 'Unduh Template',
                            'file' => 'File',
                            'work_aspect' => 'Aspek Pekerjaan',
                        ],
                        'buttons' => [
                            'import' => 'Impor Kereta',
                            'download_template' => 'Unduh',
                            'submit' => 'Impor Kereta',
                            'processing' => 'Memproses...',
                        ],
                    ],
                ],
                'partials' => [
                    'carriage_table' => [
                        'headers' => [
                            'name' => 'Nama',
                            'description' => 'Deskripsi',
                            'total_qty' => 'Jumlah Total',
                        ],
                    ],
                    'carriage_card' => [
                        'headers' => [
                            'name' => 'Nama: :name',
                            'description' => 'Deskripsi: :description',
                            'total_qty' => 'Jumlah Total: :total_qty',
                        ],
                    ],
                ],
            ],
        ],
        'component' => [
            'index' => [
                'title' => 'Komponen',
                'initial_date' => 'Tanggal Awal :initial_date',
                'preset' => 'Preset :preset',
                'breadcrumbs' => [
                    'home' => 'Beranda',
                    'project' => 'Proyek :project',
                    'components' => 'Komponen',
                ],
            ],
            'partials' => [
                'components' => [
                    'messages' => [
                        'deleted' => 'Komponen berhasil dihapus!',
                    ],
                ],
                'import' => [
                    'buttons' => [
                        'import' => 'Impor Komponen',
                    ],
                    'messages' => [
                        'imported' => 'Komponen berhasil diimpor!',
                    ],
                    'dialogs' => [
                        'title' => 'Impor Komponen',
                        'description' => 'Impor data progres dan bahan mentah dari :component_name pada Proyek :project_name.',
                        'fields' => [
                            'download_template' => 'Unduh Template',
                            'file' => 'File',
                            'work_aspect' => 'Aspek Kerja',
                        ],
                        'buttons' => [
                            'import' => 'Impor Komponen',
                            'download_template' => 'Unduh',
                            'submit' => 'Impor Komponen',
                            'processing' => 'Memproses...',
                        ],
                    ],
                ],
                'partials' => [
                    'component_table' => [
                        'headers' => [
                            'name' => 'Nama',
                            'description' => 'Deskripsi',
                            'total_qty' => 'Jumlah Total',
                        ],
                    ],
                    'component_card' => [
                        'headers' => [
                            'name' => 'Nama: :name',
                            'description' => 'Deskripsi: :description',
                            'total_qty' => 'Jumlah Total: :total_qty',
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
            'import' => [
                'messages' => [
                    'imported' => 'Proyek berhasil diimpor!',
                ],
                'dialogs' => [
                    'title' => 'Impor Proyek',
                    'description' => 'Impor Proyek dari file Excel',
                    'fields' => [
                        'download_template' => 'Unduh Template',
                        'file' => 'File',
                    ],
                    'buttons' => [
                        'import' => 'Impor Proyek',
                        'download_template' => 'Unduh',
                        'submit' => 'Impor Proyek',
                        'processing' => 'Memproses...',
                    ],
                    'messages' => [
                        'imported' => 'Proyek berhasil diimpor!',
                    ],
                ],
                'buttons' => [
                    'import' => 'Impor Proyek',
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
                        'carriages' => 'Kereta',
                        'trainsets' => 'Trainset',
                        'components' => 'Komponen',
                        'panels' => 'Panel',
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
                        'components' => 'Komponen',
                        'panels' => 'Panel',
                    ],
                ],
                'buyer_form' => [
                    'fields' => [
                        'buyer' => 'Pembeli',
                        'name' => 'Nama',
                        'email' => 'Email',
                        'phone_number' => 'Nomor Telepon',
                        'password' => 'Kata Sandi',
                    ],
                    'placeholders' => [
                        'buyer' => 'Pilih Pembeli...',
                        'name' => 'Masukkan Nama...',
                        'email' => 'Masukkan Email...',
                        'phone_number' => 'Masukkan Nomor Telepon...',
                        'password' => 'Masukkan Kata Sandi...',
                    ],
                    'messages' => [
                        'created' => 'Pembeli berhasil dibuat!',
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
            'update_asset_form' => [
                'title' => 'Perbarui Aset',
                'description' => 'Perbarui aplikasi mobile dan buku panduan.',
                'fields' => [
                    'apk' => 'Aplikasi',
                    'apk_filepond_placeholder' => 'Letakkan .APK di sini atau klik untuk mengunggah',
                    'book' => 'Buku Panduan',
                    'book_filepond_placeholder' => 'Letakkan .PDF di sini atau klik untuk mengunggah',
                ],
                'messages' => [
                    'updated_apk' => 'Aplikasi berhasil diperbarui!',
                    'updated_book' => 'Buku panduan berhasil diperbarui!',
                ],
                'buttons' => [
                    'submit' => 'Perbarui Aset',
                ],
            ],
        ],
    ],
    'trainset_attachment' => [
        'document_trainset_attachment' => [
            'title' => 'Kartu Penarikan Material (KPM)',
            'headers' => [
                'mechanic_attachment' => 'Lampiran Mekanik',
                'electric_attachment' => 'Lampiran Elektrik',
                'attachment_number' => 'Nomor Lampiran',
                'reservation_number' => 'Nomor Reservasi',
                'serial_number' => 'Nomor Seri',
                'reference_number' => 'Nomor Referensi',
                'date' => 'Tanggal',
                'source_workstation' => 'Workstation Asal',
                'destination_workstation' => 'Workstation Tujuan',
                'material_list' => 'Daftar Material',
            ],
            'raw_material_table' => [
                'headers' => [
                    'number' => 'No',
                    'material_code' => 'Kode Material',
                    'description' => 'Deskripsi',
                    'specs' => 'Spesifikasi',
                    'unit' => 'Satuan',
                    'total_required' => 'Jumlah Diminta',
                    'total_received' => 'Jumlah Diserahkan',
                    'lot' => 'Lot/TS',
                ],
            ],
            'props' => [
                'signatures' => [
                    'prepare' => 'Dibuat Oleh',
                    'send' => 'Dikirim Oleh',
                    'receive' => 'Diterima Oleh',
                    'identifier' => 'NIP',
                ],
            ],
        ],
    ],
    'panel_attachment' => [
        'document_panel_attachment' => [
            'title' => 'Kartu Penarikan Material (KPM)',
            'headers' => [
                'kpm_assembly' => 'KPM Assembly',
                'attachment_number' => 'Nomor Lampiran',
                'reservation_number' => 'Nomor Reservasi',
                'serial_number' => 'Nomor Seri',
                'reference_number' => 'Nomor Referensi',
                'date' => 'Tanggal',
                'source_workstation' => 'Workstation Asal',
                'destination_workstation' => 'Workstation Tujuan',
                'description' => 'Deskripsi',
                'material_list' => 'Daftar Material',
            ],
            'raw_material_table' => [
                'headers' => [
                    'number' => 'No',
                    'material_code' => 'Kode Material',
                    'description' => 'Deskripsi',
                    'specs' => 'Spesifikasi',
                    'unit' => 'Satuan',
                    'total_required' => 'Jumlah Diminta',
                    'total_received' => 'Jumlah Diserahkan',
                    'lot' => 'Lot/TS',
                ],
            ],
            'props' => [
                'signatures' => [
                    'prepare' => 'Dibuat Oleh',
                    'send' => 'Dikirim Oleh',
                    'receive' => 'Diterima Oleh',
                    'identifier' => 'NIP',
                ],
            ],
        ],
    ],
];
