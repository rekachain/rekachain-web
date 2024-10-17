<?php

return [
    'auth' => [
        'unauthorized' => 'You do not have permission to access this application.',
        'role' => [
            'role_exception' => 'The user must have ":role" role',
        ],
        'permission' => [
            'permission_exception' => 'The user must have ":permission" permission',
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
