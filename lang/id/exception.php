<?php

return [
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
