<?php

namespace App\Services;

use App\Models\PanelAttachment;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Interfaces\Repositories\PanelAttachmentRepositoryInterface;
use App\Support\Interfaces\Repositories\ProjectRepositoryInterface;
use App\Support\Interfaces\Repositories\TrainsetAttachmentRepositoryInterface;
use App\Support\Interfaces\Repositories\TrainsetRepositoryInterface;
use App\Support\Interfaces\Repositories\WorkstationRepositoryInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use App\Support\Interfaces\Services\WorkshopServiceInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DashboardService {
    public function __construct(
        protected PanelAttachmentRepositoryInterface $panelAttachmentRepository,
        protected TrainsetAttachmentRepositoryInterface $trainsetAttachmentRepository,
        protected ProjectServiceInterface $projectService,
        protected ProjectRepositoryInterface $projectRepository,
        protected TrainsetRepositoryInterface $trainsetRepository,
        protected WorkshopServiceInterface $workshopService,
        protected WorkstationRepositoryInterface $workstationRepository,
        protected PanelServiceInterface $panelService
    ) {}

    public function showGraph(array $data = []) {
        $project = $this->projectService->find(['id' => '1'])->first();
        // $workshop = $this->workshopService->getAll();
        $panel = $this->panelService->getAll();

        // $workshopProgress = $workshop->map(function ($workshop) use ($project) {
        //     return [
        //         'workshop_name' => $workshop->name,
        //         'progress' => $workshop->workstations->flatMap->panel_attachment_destination_workstations
        //             ->filter(function($attachment) use ($project) {
        //                 return $attachment->carriage_panel->carriage_trainset->trainset->project_id === $project->id;
        //             })
        //             ->groupBy('status')->map(function ($attachments) {
        //                 return [
        //                     'status' => $attachments->first()->status,
        //                     'count' => $attachments->count()
        //                 ];
        //             })->values()
        //     ];
        // });
        // logger($workshopProgress);

        // $panelProgress = $this->panelService->getAll()->map(function ($panel) use ($project) {
        //     return [
        //         'panel_name' => $panel->name,
        //         'progress' => $panel->carriage_panels->flatMap->panel_attachments
        //             ->filter(function($attachment) use ($project) {
        //                 return $attachment->carriage_panel->carriage_trainset->trainset->project_id === $project->id;
        //             })
        //             ->groupBy('status')
        //             ->map(function ($attachments) {
        //                 return [
        //                     'status' => $attachments->first()->status,
        //                     'count' => $attachments->count()
        //                 ];
        //             })->values()
        //     ];
        // });
        // logger($panelProgress);

        // other programming shihst

        $ts = PanelAttachment::selectRaw(
            'SUM(CASE WHEN panel_attachments.status = "done" THEN 1 ELSE 0 END) as done,
             SUM(CASE WHEN panel_attachments.status = "in_progress" THEN 1 ELSE 0 END) as in_progress'
        )
            ->addSelect('trainsets.name')
            ->join('carriage_panels', 'panel_attachments.carriage_panel_id', '=', 'carriage_panels.id')
            ->join('carriage_trainset', 'carriage_panels.carriage_trainset_id', '=', 'carriage_trainset.id')
            ->join('trainsets', 'carriage_trainset.trainset_id', '=', 'trainsets.id')
            ->groupBy('trainsets.name')
            ->get();

        $ws = DB::select('SELECT  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id where workshops.id <4 GROUP by workshops.name');

        // $ws = PanelAttachment::selectRaw(
        //     'SUM(CASE WHEN panel_attachments.status = "done" THEN 1 ELSE 0 END) as done,
        //      SUM(CASE WHEN panel_attachments.status = "in_progress" THEN 1 ELSE 0 END) as in_progress'
        // )
        // ->addSelect('workshops.name')
        // ->join('workstations', 'panel_attachments.source_workstation_id', '=', 'workstations.id')
        // ->join('workshops', 'workstations.workshop_id', '=', 'workshops.id')
        // ->groupBy('workshops.name')
        // ->limit(10)
        // ->get();

        $panel = PanelAttachment::selectRaw(
            'SUM(CASE WHEN panel_attachments.status = "done" THEN 1 ELSE 0 END) as done,
             SUM(CASE WHEN panel_attachments.status = "in_progress" THEN 1 ELSE 0 END) as in_progress'
        )
            ->addSelect('panels.name')
            ->join('carriage_panels', 'panel_attachments.carriage_panel_id', '=', 'carriage_panels.id')
            ->join('panels', 'carriage_panels.panel_id', '=', 'panels.id')
            ->groupBy('panels.name')
            ->orderBy('panels.name', 'ASC')
            ->get();

        // $data = DB::select(
        //     'SELECT SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, trainsets.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id  GROUP BY trainsets.name;'
        // );

        $data = [
            'ts' => $ts,
            'ws' => $ws,
            'panel' => $panel,
        ];

        // dump($data);
        return $data;
    }

    private $statusMapping = [
        'status_pending' => [PanelAttachmentStatusEnum::PENDING, TrainsetAttachmentStatusEnum::PENDING],
        'status_in_progress' => [PanelAttachmentStatusEnum::IN_PROGRESS, TrainsetAttachmentStatusEnum::IN_PROGRESS],
        'status_material_in_transit' => [PanelAttachmentStatusEnum::MATERIAL_IN_TRANSIT, TrainsetAttachmentStatusEnum::MATERIAL_IN_TRANSIT],
        'status_material_accepted' => [PanelAttachmentStatusEnum::MATERIAL_ACCEPTED, TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED],
        'status_done' => [PanelAttachmentStatusEnum::DONE, TrainsetAttachmentStatusEnum::DONE],
    ];

    public function showAttachmentStatusOfTrainset(array $data = []) {
        $project = $this->projectRepository->useFilters($data)->find($data['project_id'] ?? 1);
        $trainsetId = $data['attachment_status_of_trainset_filter']['column_filters']['id'] ?? null;
        $returnMerged = $data['use_merged'] ?? false;
        $useRaw = $data['use_raw'] ?? false;

        if ($useRaw) {
            $rawTrainsetAttachmentStatusExpression = $returnMerged
                ? 'trainsets.name AS trainset_name,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_pending'][1]->value . '" OR trainset_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_in_progress'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_done'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS done'
                : 'trainsets.name AS trainset_name,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_pending'][1]->value . '" OR trainset_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_in_progress'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_material_in_transit'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_in_transit,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_material_accepted'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_accepted,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_done'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS done';
            $trainsetAttachments = $project->trainset_attachments()->whereHas('trainset', fn ($query) => $query->where('status', 'progress'));
            $progressTrainset = is_null($trainsetId) ? $trainsetAttachments : $trainsetAttachments->where('trainset_id', $trainsetId);
            $progressTrainset = $progressTrainset->selectRaw($rawTrainsetAttachmentStatusExpression)->groupBy('trainset_name', 'project_id')->get();
            $rawPanelAttachmentStatusExpression = $returnMerged
                ? 'trainsets.name AS trainset_name,
                    CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_pending'][0]->value . '" OR panel_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                    CAST(SUM(CASE WHEN panel_attachments.status IN ("' . $this->statusMapping['status_in_progress'][0]->value . '", "' . $this->statusMapping['status_material_in_transit'][0]->value . '", "' . $this->statusMapping['status_material_accepted'][0]->value . '") THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                    CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_done'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS done'
                : 'trainsets.name AS trainset_name,
                    CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_pending'][0]->value . '" OR panel_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                    CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_in_progress'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                    CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_material_in_transit'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_in_transit,
                    CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_material_accepted'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_accepted,
                    CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_done'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS done';
            $panelAttachments = $project->panel_attachments()->whereHas('carriage_panel.carriage_trainset.trainset', fn ($query) => $query->where('status', 'progress'));
            $progressPanel = is_null($trainsetId) ? $panelAttachments : $panelAttachments->whereHas('carriage_panel.carriage_trainset', fn ($query) => $query->where('trainset_id', $trainsetId));
            $progressPanel = $progressPanel->selectRaw($rawPanelAttachmentStatusExpression)->groupBy('trainset_name', 'project_id')->get();
            $progress = $progressTrainset->push(...$progressPanel)
                ->groupBy('trainset_name')->map(function ($group) {
                    return [
                        'trainset_name' => $group->first()['trainset_name'],
                        'pending' => $group->sum('pending'),
                        'in_progress' => $group->sum('in_progress'),
                        'material_in_transit' => $group->sum('material_in_transit') ?? 0,
                        'material_accepted' => $group->sum('material_accepted') ?? 0,
                        'done' => $group->sum('done'),
                    ];
                })->values();

            return $progress->toArray();
        }
        $data['attachment_status_of_trainset_filter'] = array_merge_recursive(
            $data['attachment_status_of_trainset_filter'] ?? [],
            ['relation_column_filters' => ['project' => ['id' => $data['project_id'] ?? 1]]],
            ['column_filters' => ['status' => ['progress', 'done']]]
        );
        // $data['attachment_status_of_trainset_filter']['column_filters'] = ['id' => $data['id'] ?? 2];
        $trainsets = $this->trainsetRepository->useFilters($data['attachment_status_of_trainset_filter']);
        $progressOfTrainset = $trainsets->get()->map(function ($trainset) use ($data) {
            $trainsetProgress = $this->calculateProgress($trainset->trainset_attachments, $data, 1);
            $panelProgress = $this->calculateProgress($trainset->panel_attachments, $data, 0);
            $progress = $panelProgress->isNotEmpty() ? $trainsetProgress->merge($panelProgress) : $trainsetProgress;

            return [
                'trainset_name' => $trainset->name,
                'progress' => $progress->groupBy('status')->map(fn ($group) => ['status' => $group->first()['status'], 'count' => $group->sum('count')])->values(),
            ];
        });

        return $progressOfTrainset->toArray();

    }

    private function calculateProgress($attachments, $data, $key) {
        $useMerged = $data['use_merged'] ?? false;

        return $attachments->filter(fn ($attachment) => !array_key_exists('status', $data) || ($attachment->status?->value ?? $this->statusMapping['status_pending'][$key]) === $data['status'])
            ->groupBy(fn ($attachment) => $attachment->status)
            ->map(fn ($attachment) => (!$useMerged) ? ['status' => $attachment->first()->status ?? $this->statusMapping['status_pending'][$key], 'count' => $attachment->count()]
                : ['status' => match ($attachment->first()->status) {
                    $this->statusMapping['status_in_progress'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_material_in_transit'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_material_accepted'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_done'][$key] => $this->statusMapping['status_done'][$key],
                    default => $this->statusMapping['status_pending'][$key],
                }, 'count' => $attachment->count()]
            )
            ->values();
    }

    public function showAttachmentStatusOfWorkstationRaw(array $data) {
        $returnMerged = $data['use_merged'] ?? false;
        $data['attachment_status_of_workstation_filter'] = array_merge_recursive(
            $data['attachment_status_of_workstation_filter'] ?? [], [
                'relation_column_filters' => [
                    'trainset' => [
                        'status' => ['progress', 'done'],
                        'project_id' => $data['project_id'] ?? 1,
                    ],
                ],
            ]);
        $rawTrainsetAttachmentStatusExpression = $returnMerged
            ? 'workstations.name as workstation_name,
                CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_pending'][1]->value . '" OR trainset_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_in_progress'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_done'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS done'
            : 'workstations.name as workstation_name,
                CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_pending'][1]->value . '" OR trainset_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_in_progress'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_material_in_transit'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_in_transit,
                CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_material_accepted'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_accepted,
                CAST(SUM(CASE WHEN trainset_attachments.status = "' . $this->statusMapping['status_done'][1]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS done';
        $rawPanelAttachmentStatusExpression = $returnMerged
            ? 'workstations.name as workstation_name,
                CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_pending'][0]->value . '" OR panel_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                CAST(SUM(CASE WHEN panel_attachments.status IN ("' . $this->statusMapping['status_in_progress'][0]->value . '", "' . $this->statusMapping['status_material_in_transit'][0]->value . '", "' . $this->statusMapping['status_material_accepted'][0]->value . '") THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_done'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS done'
            : 'workstations.name as workstation_name,
                CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_pending'][0]->value . '" OR panel_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_in_progress'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_material_in_transit'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_in_transit,
                CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_material_accepted'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_accepted,
                CAST(SUM(CASE WHEN panel_attachments.status = "' . $this->statusMapping['status_done'][0]->value . '" THEN 1 ELSE 0 END) AS UNSIGNED) AS done';

        $workstationTrainsetProgress = $this->trainsetAttachmentRepository
            ->useFilters($data['attachment_status_of_workstation_filter'])
            // ->with('destination_workstation')
            ->join('workstations', 'trainset_attachments.destination_workstation_id', '=', 'workstations.id')
            ->selectRaw($rawTrainsetAttachmentStatusExpression)
            // ->where('trainset_attachments.status', 'progress')
            ->groupBy('workstation_name')
            ->get();
        $workstationPanelProgress = $this->panelAttachmentRepository
            ->useFilters($data['attachment_status_of_workstation_filter'])
            // ->with('destination_workstation')
            ->join('workstations', 'panel_attachments.destination_workstation_id', '=', 'workstations.id')
            ->selectRaw($rawPanelAttachmentStatusExpression)
            // ->where('panel_attachments.status', 'progress')
            // ->whereHas('carriage_panels.carriage_trainset.trainsets', fn($query) => $query->where('project_id', $projectId))
            ->groupBy('workstation_name')
            ->get();
        $progress = $workstationPanelProgress->isNotEmpty() ? $workstationTrainsetProgress->push(...$workstationPanelProgress) : $workstationTrainsetProgress;

        $progressOfWorkstation = $progress
            ->groupBy('workstation_name')
            ->map(fn ($attachment) => [
                'workstation_name' => $attachment->first()->workstation_name,
                'pending' => $attachment->sum('pending'),
                'in_progress' => $attachment->sum('in_progress'),
                'material_in_transit' => $attachment->sum('material_in_transit'),
                'material_accepted' => $attachment->sum('material_accepted'),
                'done' => $attachment->sum('done'),
            ])
            ->sortBy('workstation_name')
            ->values();

        return $progressOfWorkstation->toArray();
    }

    public function showAttachmentStatusOfWorkstation(array $data) {
        $data['attachment_status_of_workstation_filter'] = array_merge_recursive(
            $data['attachment_status_of_workstation_filter'] ?? [], [
                'relation_column_filters' => [
                    'trainset' => [
                        'status' => ['progress', 'done'],
                        'project_id' => $data['project_id'] ?? 1,
                    ],
                ],
            ]);
        $trainsetAttachments = $this->trainsetAttachmentRepository
            ->useFilters($data['attachment_status_of_workstation_filter'])->get();
        $workstationTrainsetProgress = $trainsetAttachments->groupBy('destination_workstation_id')->map(fn ($attachments) => [
            'workstation_name' => $attachments->first()->destination_workstation->name . ' ' . $attachments->first()->destination_workstation->location . ' ' . $attachments->first()->destination_workstation->workshop->name,
            'progress' => $this->calculateProgress($attachments, $data, 1),
        ]);

        $panelAttachments = $this->panelAttachmentRepository
            ->useFilters($data['attachment_status_of_workstation_filter'])->get();
        $workstationPanelProgress = $panelAttachments->groupBy('destination_workstation_id')->map(fn ($attachments) => [
            'workstation_name' => $attachments->first()->destination_workstation->name . ' ' . $attachments->first()->destination_workstation->location . ' ' . $attachments->first()->destination_workstation->workshop->name,
            'progress' => $this->calculateProgress($attachments, $data, 0),
        ]);
        $progress = $workstationPanelProgress->isNotEmpty() ? $workstationTrainsetProgress->merge($workstationPanelProgress) : $workstationTrainsetProgress;
        $progressOfWorkstation = $progress
            ->groupBy('workstation_name')
            ->map(fn (Collection $attachment) => [
                'workstation_name' => $attachment->first()['workstation_name'],
                'progress' => $attachment->map(fn ($item) => $item['progress'])->flatten(1)
                    ->groupBy('status')
                    ->map(fn ($attachment) => ['status' => $attachment->first()['status'], 'count' => $attachment->sum('count')])
                    ->values(),
            ])
            ->sortBy('workstation_name')
            ->values();

        return $progressOfWorkstation->toArray();
    }

    public function storeApkFile(): bool {
        $filePath = app_path('Assets/rekachain-mobile.apk');
        $backupDir = app_path('Assets/Backups');
        if (request()->hasFile('file_path')) {
            if (file_exists($filePath)) {
                if (!is_dir($backupDir)) {
                    mkdir($backupDir, 0755, true);
                }
                $backupFilePath = $backupDir . '/rekachain-mobile-' . now()->format('Y-m-d_H-i-s') . '.apk';
                rename($filePath, $backupFilePath);
            }
            request()->file('file_path')->move(dirname($filePath), basename($filePath));
            return true;
        }
        return false;
    }

    public function storeManualBookFile(): bool {
        $filePath = app_path('Assets/manual-book.pdf');
        $backupDir = app_path('Assets/Backups');
        if (request()->hasFile('file_path')) {
            if (file_exists($filePath)) {
                if (!is_dir($backupDir)) {
                    mkdir($backupDir, 0755, true);
                }
                $backupFilePath = $backupDir . '/manual-book-' . now()->format('Y-m-d_H-i-s') . '.pdf';
                rename($filePath, $backupFilePath);
            }
            request()->file('file_path')->move(dirname($filePath), basename($filePath));
            return true;
        }
        return false;
    }

    public function downloadApkFile(): \Symfony\Component\HttpFoundation\BinaryFileResponse {
        $apkFilePath = app_path('Assets/rekachain-mobile.apk');
        if (!file_exists($apkFilePath)) {
            $apkFilePath = app_path('Assets/rekachain-mobile_v1.apk');
            if (!file_exists($apkFilePath)) abort(404, 'APK File not found');
        };

        return response()->download($apkFilePath, 'rekachain-mobile.apk');
    }

    public function downloadManualBookFile(): \Symfony\Component\HttpFoundation\BinaryFileResponse {
        $manualBookFilePath = app_path('Assets/manual-book.pdf');
        if (!file_exists($manualBookFilePath)) {
            $manualBookFilePath = app_path('Assets/manual-book_v1.pdf');
            if (!file_exists($manualBookFilePath)) abort(404, 'Manual Book File not found');
        };

        return response()->download($manualBookFilePath, 'manual-book-rekachain.pdf');
    }
}
