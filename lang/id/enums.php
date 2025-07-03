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
    'App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum' => [
        'prepare' => 'Perencana',
        'send' => 'Pengirim',
        'receive' => 'Penerima',
    ],
    'App\Support\Enums\PanelAttachmentStatusEnum' => [
        'material_in_transit' => 'Material Dikirm',
        'material_accepted' => 'Material Diterima',
        'in_progress' => 'Di Proses',
        'pending' => 'Di Tunda',
        'done' => 'Selesai',
    ],
    'App\Support\Enums\PanelAttachmentHandlerHandlesEnum' => [
        'prepare' => 'Perencana',
        'send' => 'Pengirim',
        'receive' => 'Penerima',
    ],
    'App\Support\Enums\ReturnedProductStatusEnum' => [
        'requested' => 'Diminta',
        'draft' => 'Draf',
        'progress' => 'Dalam Proses',
        'done' => 'Selesai',
        'scrapped' => 'Scrap',
    ],
    'App\Support\Enums\ProductProblemStatusEnum' => [
        'fixed' => 'Diperbaiki',
        'progress' => 'Dalam Proses',
        'changed' => 'Diganti',
        'draft' => 'Draf',
        're-set' => 'Diatur Ulang',
    ],
    'App\Support\Enums\ProductProblemCauseEnum' => [
        'workman_ship' => 'Pengerjaan',
        'quality' => 'Kualitas',
        'operational' => 'Operasional',
    ],
    'App\Support\Enums\ProductRestockStatusEnum' => [
        'requested' => 'Diminta',
        'draft' => 'Draf',
        'initiated' => 'Di-inisiasi',
        'progress' => 'Dalam Proses',
        'done' => 'Selesai',
        'aborted' => 'Dibatalkan',
    ],
    'others' => [
        'null_work_status' => 'Belum Diproses',
        'null_acceptance_status' => 'Belum Diproses',
    ],
];
