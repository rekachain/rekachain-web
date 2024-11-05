<?php

namespace App\Services;

use App\Models\Workshop;
use App\Models\PanelAttachment;
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

        // for filter if sido🗿
        if (array_key_exists('status', $data)) {
            $status = $data['status'];

            logger("Status: {$status}");
        }

        $trainsetPanelAttachmentProgress = $project->trainsets()->get()->map(function ($trainset) {
            return [
                'trainset_name' => $trainset->name,
                'progress' => $trainset->panel_attachments->groupBy('status')->map(function ($attachments) {
                    return [
                        'status' => $attachments->first()->status,
                        'count' => $attachments->count()
                    ];
                })->values()
            ];
        })->values();
        logger($trainsetPanelAttachmentProgress);
           
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

        $ws = PanelAttachment::selectRaw(
            'SUM(CASE WHEN panel_attachments.status = "done" THEN 1 ELSE 0 END) as done,
             SUM(CASE WHEN panel_attachments.status = "in_progress" THEN 1 ELSE 0 END) as in_progress'
        )
        ->addSelect('workshops.name')
        ->join('workstations', 'panel_attachments.source_workstation_id', '=', 'workstations.id')
        ->join('workshops', 'workstations.workshop_id', '=', 'workshops.id')
        ->groupBy('workshops.name')
        ->limit(10)
        ->get();

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
}
