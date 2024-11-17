<?php

return [
    'navbar' => [
        'search' => [
            'placeholder' => 'Cari...',
        ],
        'localization' => [
            'title' => 'Bahasa',
        ],
        'notification' => [
            'title' => 'Notifikasi',
            'empty' => 'Anda tidak memiliki notifikasi, nikmati hari Anda',
        ],
        'profile' => [
            'title' => 'Akun Saya',
            'menus' => [
                'profile' => 'Profil',
                'logout' => 'Keluar',
            ],
        ],
    ],
    'sidebar' => [
        'menus' => [
            'general' => 'Umum',
            'manufacturing' => 'Manufaktur',
            'support' => 'Dukungan',
        ],
        'links' => [
            'dashboard' => 'Halaman Utama',
            'work_days' => 'Hari Kerja',
            'staff_management' => 'Manajemen Staf',
            'divisions' => 'Divisi',
            'workshops' => 'Workshop',
            'workstations' => 'Workstation',
            'staff' => 'Staf',
            'access_control' => 'Hak Akses',
            'permissions' => 'Izin',
            'roles' => 'Peranan',
            'steps' => 'Daftar Langkah',
            'raw_materials' => 'Daftar Bahan Mentah',
            'components' => 'Daftar Komponen',
            'panels' => 'Daftar Panel',
            'projects' => 'Daftar Proyek',
            'carriages' => 'Daftar Gerbong',
            'settings' => 'Pengaturan',
            'feedback' => 'Umpan Balik',
            'helpdesk' => 'Helpdesk',
        ],
    ],
    'sidebar_logout' => [
        'title' => 'Apakah Anda yakin ingin keluar?',
        'description' => 'Tekan "Keluar" di bawah jika Anda siap mengakhiri sesi Anda saat ini.',
        'buttons' => [
            'back' => 'Kembali',
            'logout' => 'Keluar',
        ],
    ],
    'feedback' => [
        'title' => 'Umpan Balik',
        'description' => 'Umpan balik Anda penting bagi kami. Kami menghargai dan mempertimbangkan setiap saran dan umpan balik.',
        'fields' => [
            'name' => 'Nama',
            'name_placeholder' => 'Nama Anda...',
            'email' => 'Email',
            'email_placeholder' => 'Email Anda...',
            'rating' => 'Penilaian',
            'message' => 'Pesan',
            'message_placeholder' => 'Pesan umpan balik Anda...',
        ],
    ],
    'generic_data_selector' => [
        'fields' => [
            'search_placeholder' => 'Cari...',
            'select_placeholder' => 'Pilih',
        ],
        'actions' => [
            'clear_selection' => '-- Hapus Pilihan --',
            'loading' => 'Memuat...',
            'no_results' => 'Tidak ada hasil yang ditemukan',
        ],
    ],
    'generic_filters' => [
        'fields' => [
            'search_placeholder' => 'Cari...',
            'select_placeholder' => 'Pilih',
            'pagination_placeholder' => 'Item per halaman',
        ],
    ],
    'sidebar_helpdesk' => [
        'messages' => [
            'created' => 'Kontak helpdesk berhasil dibuat.',
            'updated' => 'Kontak helpdesk berhasil diperbarui.',
        ],
        'dialogs' => [
            'messages' => [
                'no_email' => 'Tidak ada email yang tersedia.',
                'no_notice' => 'Tidak ada pemberitahuan yang tersedia.',
                'no_phone' => 'Tidak ada nomor telepon yang tersedia.',
                'no_helpdesk_contact' => 'Tidak ada kontak helpdesk yang tersedia.',
            ],
            'headers' => [
                'contact' => 'Informasi Kontak',
                'email' => 'Email :',
                'phone_number' => 'Nomor Telepon :',
                'notice' => 'Pemberitahuan :',
            ],
            'title' => 'Kontak Helpdesk',
            'edit_title' => 'Edit Kontak Helpdesk',
            'create_title' => 'Buat Kontak Helpdesk',
            'fields' => [
                'email' => 'Email',
                'phone_number' => 'Nomor Telepon',
                'notice' => 'Pemberitahuan',
            ],
            'buttons' => [
                'create_first_helpdesk_contact' => 'Buat Kontak Helpdesk',
            ],
        ],
    ],
];
