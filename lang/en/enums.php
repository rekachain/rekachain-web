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
    'App\Support\Enums\PanelAttachmentStatusEnum' => [
        'material_in_transit' => 'Material In Transit',
        'material_accepted' => 'Material Accepted',
        'in_progress' => 'In Progress',
        'pending' => 'Pending',
        'done' => 'Done',
    ],
    'App\Support\Enums\PanelAttachmentHandlerHandlesEnum' => [
        'prepare' => 'Prepare',
        'send' => 'Sender',
        'receive' => 'Receiver',
    ],
    'App\Support\Enums\ReturnedProductStatusEnum' => [
        'requested' => 'Requested',
        'draft' => 'Draft',
        'progress' => 'In Progress',
        'done' => 'Done',
        'scrapped' => 'Scrapped',
    ],
    'App\Support\Enums\ProductProblemStatusEnum' => [
        'fixed' => 'Fixed',
        'progress' => 'In Progress',
        'changed' => 'Changed',
        'draft' => 'Draft',
        're-set' => 'Re-setting',
    ],
    'App\Support\Enums\ProductProblemCauseEnum' => [
        'workman_ship' => 'Workman Ship',
        'quality' => 'Quality',
        'operational' => 'Operational',
    ],
    'App\Support\Enums\ProductRestockStatusEnum' => [
        'requested' => 'Requested',
        'draft' => 'Draft',
        'initiated' => 'Initiated',
        'progress' => 'In Progress',
        'done' => 'Done',
        'aborted' => 'Aborted',
    ],
    'others' => [
        'null_work_status' => 'Not Processed',
        'null_acceptance_status' => 'Not Processed',
    ],
];
