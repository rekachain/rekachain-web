<?php

namespace App\Services;

use App\Models\PanelAttachment;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use Illuminate\Support\Facades\DB;
use App\Support\Interfaces\Services\PanelServiceInterface;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use App\Support\Interfaces\Services\WorkshopServiceInterface;

class DashboardService {
    public function __construct(
        protected ProjectServiceInterface $projectService, protected WorkshopServiceInterface $workshopService, protected PanelServiceInterface $panelService
    ) {}

    public function showGraph(array $data = []) {
        $project = $this->projectService->find(['id' => '1'])->first();
        $workshop = $this->workshopService->getAll();
        $panel = $this->panelService->getAll();

        $workshopProgress = $workshop->map(function ($workshop) use ($project) {
            return [
                'workshop_name' => $workshop->name,
                'progress' => $workshop->workstations->flatMap->panel_attachment_destination_workstations
                    ->filter(function($attachment) use ($project) {
                        return $attachment->carriage_panel->carriage_trainset->trainset->project_id === $project->id;
                    })
                    ->groupBy('status')->map(function ($attachments) {
                        return [
                            'status' => $attachments->first()->status,
                            'count' => $attachments->count()
                        ];
                    })->values()
            ];
        });        
        logger($workshopProgress);

        $panelProgress = $this->panelService->getAll()->map(function ($panel) use ($project) {
            return [
                'panel_name' => $panel->name,
                'progress' => $panel->carriage_panels->flatMap->panel_attachments
                    ->filter(function($attachment) use ($project) {
                        return $attachment->carriage_panel->carriage_trainset->trainset->project_id === $project->id;
                    })
                    ->groupBy('status')
                    ->map(function ($attachments) {
                        return [
                            'status' => $attachments->first()->status,
                            'count' => $attachments->count()
                        ];
                    })->values()
            ];
        });
        logger($panelProgress);

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
        'status_done' => [PanelAttachmentStatusEnum::DONE, TrainsetAttachmentStatusEnum::DONE]
    ];
    public function showPanelAttachmentStatusOfTrainset(array $data = []) {
        $project = $this->projectService->find(['id' => $data['project_id'] ?? 1])->first();
        $returnMerged = $data['use_merged'] ?? false;
        $useRaw = $data['use_raw'] ?? false;

        if ($useRaw) {
            $rawPanelAttachmentStatusExpression = $returnMerged
                ? 'trainsets.name AS trainset_name,
                    CAST(SUM(CASE WHEN panel_attachments.status = "'.$this->statusMapping['status_pending'][0]->value .'" OR panel_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                    CAST(SUM(CASE WHEN panel_attachments.status IN ("'.$this->statusMapping['status_in_progress'][0]->value.'", "'.$this->statusMapping['status_material_in_transit'][0]->value.'", "'.$this->statusMapping['status_material_accepted'][0]->value.'") THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                    CAST(SUM(CASE WHEN panel_attachments.status = "'.$this->statusMapping['status_done'][0]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS done'
                : 'trainsets.name AS trainset_name,
                    CAST(SUM(CASE WHEN panel_attachments.status = "'.$this->statusMapping['status_pending'][0]->value .'" OR panel_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                    CAST(SUM(CASE WHEN panel_attachments.status = "'.$this->statusMapping['status_in_progress'][0]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                    CAST(SUM(CASE WHEN panel_attachments.status = "'.$this->statusMapping['status_material_in_transit'][0]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_in_transit,
                    CAST(SUM(CASE WHEN panel_attachments.status = "'.$this->statusMapping['status_material_accepted'][0]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_accepted,
                    CAST(SUM(CASE WHEN panel_attachments.status = "'.$this->statusMapping['status_done'][0]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS done';
                    
            $progressPanel = $project->panel_attachments()->selectRaw($rawPanelAttachmentStatusExpression)->groupBy('trainset_name', 'project_id')->get();
            $rawTrainsetAttachmentStatusExpression = $returnMerged
                ? 'trainsets.name AS trainset_name,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "'.$this->statusMapping['status_pending'][1]->value .'" OR trainset_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "'.$this->statusMapping['status_in_progress'][1]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "'.$this->statusMapping['status_done'][1]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS done'
                : 'trainsets.name AS trainset_name,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "'.$this->statusMapping['status_pending'][1]->value .'" OR trainset_attachments.status IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS pending,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "'.$this->statusMapping['status_in_progress'][1]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS in_progress,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "'.$this->statusMapping['status_material_in_transit'][1]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_in_transit,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "'.$this->statusMapping['status_material_accepted'][1]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS material_accepted,
                    CAST(SUM(CASE WHEN trainset_attachments.status = "'.$this->statusMapping['status_done'][1]->value.'" THEN 1 ELSE 0 END) AS UNSIGNED) AS done';
            $progressTrainset = $project->trainset_attachments()->selectRaw($rawTrainsetAttachmentStatusExpression)->groupBy('trainset_name', 'project_id')->get();
            $progress = $progressPanel->push(...$progressTrainset)
            ->groupBy('trainset_name')->map(function ($group) {
                return [
                    'trainset_name' => $group->first()['trainset_name'],
                    'pending' => $group->sum('pending'),
                    'in_progress' => $group->sum('in_progress'),
                    'material_in_transit' => $group->sum('material_in_transit') ?? 0,
                    'material_accepted' => $group->sum('material_accepted') ?? 0,
                    'done' => $group->sum('done')
                ];
            })->values();
            return $progress->toArray();
        } else {
            $trainsets = $project->trainsets()->get();
            $progress = $trainsets->map(function ($trainset) use ($data) {
                $panelProgress = $this->calculateProgress($trainset->panel_attachments, $data, 0);
                $trainsetProgress = $this->calculateProgress($trainset->trainset_attachments, $data, 1);

                return [
                    'trainset_name' => $trainset->name,
                    'progress' => $panelProgress->merge($trainsetProgress)->groupBy('status')->map(fn($group) => ['status' => $group->first()['status'], 'count' => $group->sum('count')])->values()
                ];
            });
            return $progress->toArray();
        }
    }

    private function calculateProgress($attachments, $data, $key) {
        $useMerged = $data['use_merged'] ?? false;
        return $attachments->filter(fn ($a) => !array_key_exists('status', $data) || ($a->status?->value ?? $this->statusMapping['status_pending'][$key]) === $data['status'])
            ->groupBy(fn ($a) => $a->status)
            ->map(fn ($a) => 
                (!$useMerged) ? ['status' => $a->first()->status ?? $this->statusMapping['status_pending'][$key], 'count' => $a->count()]
                : ['status' => match ($a->first()->status) { 
                    $this->statusMapping['status_in_progress'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_material_in_transit'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_material_accepted'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_done'][$key] => $this->statusMapping['status_done'][$key],
                    default => $this->statusMapping['status_pending'][$key], 
                }, 'count' => $a->count()]
            )
            ->values();
    }
}