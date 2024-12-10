<?php

return [
    'auth' => [
        'unauthorized' => 'Anda tidak memiliki izin untuk mengakses aplikasi ini.',
        'role' => [
            'role_exception' => 'Pengguna harus memiliki peran ":role"',
        ],
        'permission' => [
            'permission_exception' => 'Pengguna harus memiliki izin ":permission"',
        ],
        'permission_and_role' => [
            'permission_and_role_exception' => 'Pengguna harus memiliki izin ":permission" :conjunction peran ":role"',
        ],
    ],
    'services' => [
        'trainset_service' => [
            'update' => [
                'generate_trainset_attachments' => [
                    'component_progress_not_identified_exception' => 'Progres tidak ditemukan di :component',
                ],
                'generate_panel_attachments' => [
                    'panel_progress_not_identified_exception' => 'Progres tidak ditemukan di :panel',
                ],
            ],
            'delete' => [
                'trainset_in_progress_exception' => 'Manufaktur trainset sedang dalam proses dan tidak dapat diubah.',
            ],
        ],
    ],
];
