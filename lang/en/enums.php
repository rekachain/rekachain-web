<?php

return [
    'App\Support\Enums\TrainsetStatusEnum' => [
        'draft' => 'Draft',
        'progress' => 'Progress',
        'failed' => 'Failed',
        'done' => 'Done',
    ],
    'App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum' => [
        null => 'Not Processed',
        'accepted' => 'Accepted',
        'declined' => 'Declined',
    ],
    'App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum' => [
        null => 'Not Processed',
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
    'others' => [
        'null_work_status' => 'Not Processed',
    ],
];
