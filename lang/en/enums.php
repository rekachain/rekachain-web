<?php

return [
    'App\Support\Enums\TrainsetStatusEnum' => [
        'draft' => 'Draft',
        'progress' => 'Progress',
        'failed' => 'Failed',
        'done' => 'Done',
    ],
    'App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum' => [
        'accepted' => 'Accepted',
        'declined' => 'Declined',
    ],
    'App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum' => [
        'accepted' => 'Accepted',
        'declined' => 'Declined',
    ],
    'App\Support\Enums\DetailWorkerPanelWorkStatusEnum' => [
        'in_progress' => 'In Progress',
        'completed' => 'Completed',
    ],
    'App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum' => [
        'in_progress' => 'In Progress',
        'completed' => 'Completed',
    ],
    'App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum' => [
        'prepare' => 'Prepare',
        'send' => 'Sender',
        'receive' => 'Receiver',
    ],
    'App\Support\Enums\PanelAttachmentHandlerHandlesEnum' => [
        'prepare' => 'Prepare',
        'send' => 'Sender',
        'receive' => 'Receiver',
    ],
    'others' => [
        'null_work_status' => 'Not Processed',
        'null_acceptance_status' => 'Not Processed',
    ],
];
