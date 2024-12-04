<?php

return [
    'App\Support\Enums\TrainsetStatusEnum' => [
        'draft' => 'Konsep',
        'progress' => 'Proses',
        'failed' => 'Gagal',
        'done' => 'Selesai',
    ],
    'App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum' => [
        'accepted' => 'Diterima',
        'declined' => 'Ditolak',
    ],
    'App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum' => [
        'accepted' => 'Diterima',
        'declined' => 'Ditolak',
    ],
    'App\Support\Enums\DetailWorkerPanelWorkStatusEnum' => [
        'in_progress' => 'Dalam Proses',
        'completed' => 'Selesai',
    ],
    'App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum' => [
        'in_progress' => 'Dalam Proses',
        'completed' => 'Selesai',
    ],
    'others' => [
        'null_work_status' => 'Belum Diproses',
        'null_acceptance_status' => 'Belum Diproses',
    ],
];
