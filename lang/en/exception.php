<?php

return [
    'auth' => [
        'permission' => [
            'permission_exception' => 'Unauthorized',
        ],
    ],
    'services' => [
        'trainset_service' => [
            'delete' => [
                'trainset_in_progress_exception' => 'The trainset is currently in progress and cannot be modified.',
            ],
        ],
    ],
];
