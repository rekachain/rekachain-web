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
        'permission_and_role' => [
            'permission_and_role_exception' => 'The user must have ":permission" permission :conjunction ":role" role',
        ],
    ],
    'services' => [
        'trainset_service' => [
            'update' => [
                'generate_trainset_attachments' => [
                    'component_progress_not_identified_exception' => 'Progress is not identified in :component',
                ],
                'generate_panel_attachments' => [
                    'panel_progress_not_identified_exception' => 'Progress is not identified in :panel',
                ],
            ],
            'delete' => [
                'trainset_in_progress_exception' => 'The trainset is currently in progress and cannot be modified.',
            ],
        ],
    ],
];
