<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Project;
use App\Models\Carriage;
use App\Models\Trainset;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\Project\ProjectsImport;
use Illuminate\Database\Eloquent\Model;
use App\Support\Interfaces\Services\PanelServiceInterface;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use App\Imports\CarriagePanel\CarriagePanelProgressMaterialImport;
use App\Support\Interfaces\Repositories\ProjectRepositoryInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Imports\CarriagePanelComponent\CarriagePanelComponentProgressMaterialImport;

class ProjectService extends BaseCrudService implements ProjectServiceInterface {
    public function __construct(
        protected TrainsetServiceInterface $trainsetService,
        protected PanelServiceInterface $panelService
    ) {
        parent::__construct();
    }

    private function createTrainsets(Project $project, $trainsetNeeded): void {
        if ($trainsetNeeded <= 0) {
            return;
        }

        $trainsets = collect(range(1, $trainsetNeeded))
            ->map(fn ($i) => ['project_id' => $project->id])
            ->toArray();

        $this->trainsetService->createMany($trainsets);
    }

    public function create(array $data): ?Model {
        $project = parent::create($data);

        $this->createTrainsets($project, $data['trainset_needed']);

        return $project;
    }

    public function importProject(UploadedFile $file): bool {
        Excel::import(new ProjectsImport($file), $file);

        return true;
    }

    public function importProjectPanelProgressMaterial(Project $project, UploadedFile $file, array $data): bool {
        $carriagePanels = $project->carriage_panels()->wherePanelId($data['panel_id'])->get();
        foreach ($carriagePanels as $carriagePanel) {
            Excel::import(new CarriagePanelProgressMaterialImport($carriagePanel, $data['override'] ?? null), $file);
        }

        return true;
    }

    public function importProjectComponentProgressMaterial(Project $project, UploadedFile $file, array $data): bool {
        $carriagePanelComponents = $project->carriage_panel_components()->whereComponentId($data['component_id'])->get();
        foreach ($carriagePanelComponents as $carriagePanelComponent) {
            Excel::import(new CarriagePanelComponentProgressMaterialImport($carriagePanelComponent, $data['work_aspect_id'], $data['override'] ?? null), $file);
        }

        return true;
    }

    public function importProjectCarriagePanelProgressMaterial(Project $project, Carriage $carriage, UploadedFile $file, array $data): bool {
        $carriagePanels = $project->carriage_panels()->whereCarriageId($carriage->id)->wherePanelId($data['panel_id'])->get();
        foreach ($carriagePanels as $carriagePanel) {
            Excel::import(new CarriagePanelProgressMaterialImport($carriagePanel, $data['override'] ?? null), $file);
        }

        return true;
    }

    public function importProjectCarriageComponentProgressMaterial(Project $project, Carriage $carriage, UploadedFile $file, array $data): bool {
        $carriagePanelComponents = $project->carriage_panel_components()->whereCarriageId($carriage->id)->whereComponentId($data['component_id'])->get();
        foreach ($carriagePanelComponents as $carriagePanelComponent) {
            Excel::import(new CarriagePanelComponentProgressMaterialImport($carriagePanelComponent, $data['work_aspect_id'], $data['override'] ?? null), $file);
        }

        return true;
    }

    public function importProjectTrainsetPanelProgressMaterial(Project $project, Trainset $trainset, UploadedFile $file, array $data): bool {
        $trainsetPanels = $project->carriage_panels()->whereTrainsetId($trainset->id)->wherePanelId($data['panel_id'])->get();
        foreach ($trainsetPanels as $trainsetPanel) {
            Excel::import(new CarriagePanelProgressMaterialImport($trainsetPanel, $data['override'] ?? null), $file);
        }

        return true;
    }

    public function importProjectTrainsetComponentProgressMaterial(Project $project, Trainset $trainset, UploadedFile $file, array $data): bool {
        $trainsetPanelComponents = $project->carriage_panel_components()->whereTrainsetId($trainset->id)->whereComponentId($data['component_id'])->get();
        foreach ($trainsetPanelComponents as $trainsetPanelComponent) {
            Excel::import(new CarriagePanelComponentProgressMaterialImport($trainsetPanelComponent, $data['work_aspect_id'], $data['override'] ?? null), $file);
        }

        return true;
    }

    public function calculateEstimatedTime($project_id = null) {
        $mechanicTime = 0;
        $electricalTime = 0;
        $assemblyTime = 0;

        if ($project_id) {
            $project = \App\Models\Project::with(['trainsets.carriage_trainsets' => [
                'carriage_panels' => [
                    'progress.steps'
                ]
            ]])->findOrFail($project_id);

            $lastTrainset = $project->trainsets->last();

            foreach ($project->trainsets as $trainset) {
                foreach ($trainset->carriage_trainsets as $carriageTrainset) {
                    foreach ($carriageTrainset->carriage_panels as $carriagePanel) {
                        $stepTime = 0;
                        foreach ($carriagePanel->progress->steps as $step) {
                            $stepTime = $step->estimated_time * $carriagePanel->qty * $carriageTrainset->qty;
                        }

                        switch($carriagePanel->progress->work_aspect_id) {
                            case 1: // Mechanic
                                $mechanicTime += $stepTime;
                                break;
                            case 2: // Electric
                                $electricalTime += $stepTime;
                                break;
                            case 3: // Assembly
                                if ($trainset->id === $lastTrainset->id) {
                                    $assemblyTime += $stepTime;
                                }
                                break;
                        }

                        foreach ($carriagePanel->carriage_panel_components as $component) {
                            $componentStepTime = 0;
                            foreach ($component->progress->steps as $step) {
                                $componentStepTime = $step->estimated_time * $component->qty * $carriagePanel->qty * $carriageTrainset->qty;
                            }

                            switch ($component->progress->work_aspect_id) {
                                case 1: // Mechanic
                                    $mechanicTime += $componentStepTime;
                                    break;
                                case 2: // Electric
                                    $electricalTime += $componentStepTime;
                                    break;
                                case 3: // Assembly
                                    if ($trainset->id === $lastTrainset->id) {
                                        $assemblyTime += $stepTime;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }

            $totalTime = max($mechanicTime, $electricalTime) + $assemblyTime;

            $minutesPerWorkingDay = 8 * 60; // 8 hours * 60 minutes
            $calculatedEstimateTime = ceil($totalTime / $minutesPerWorkingDay);

            // Get project start date
            $startDate = $project->initial_date; // Assuming you have initial_date in your Project model
            $endDate = Carbon::parse($startDate);

            // Add working days considering only Monday-Friday
            for ($i = 0; $i < $calculatedEstimateTime; $i++) {
                $endDate->addDay();
                // Skip weekends
                while ($endDate->isWeekend()) {
                    $endDate->addDay();
                }
            }

            // Save calculated estimate time and end date to the project
            $project->update([
                'calculated_estimate_time' => $calculatedEstimateTime,
                'estimated_end_date' => $endDate->format('Y-m-d')
            ]);

            if($project->update()) {
                $this->trainsetService->calculateEstimatedTime($project->trainsets->last()->id);
            }

            return true;

            // return response()->json([
            //     'project_id' => $project_id,
            //     'mechanical_time' => $mechanicTime,
            //     'electrical_time' => $electricalTime,
            //     'assembly_time' => $assemblyTime,
            //     'total_estimated_time' => $totalTime,
            //     'calculated_estimate_time' => $calculatedEstimateTime,
            //     'initial_date' => $startDate,
            //     'estimated_end_date' => $endDate->format('Y-m-d')
            // ]);
        }

        return response()->json(['message' => 'Please provide project_id']);
    }

    public function updateInitialDate(Project $project, array $data): bool {
        // Get update initial date
        $endDate = Carbon::parse($data['initial_date']);

        // Add working days considering only Monday-Friday
        for ($i = 0; $i < $project->calculated_estimate_time; $i++) {
            $endDate->addDay();
            // Skip weekends
            while ($endDate->isWeekend()) {
                $endDate->addDay();
            }
        }

        $project->end_date = $endDate->format('Y-m-d');
        $project->save();

        return true;
    }

    public function addTrainsets(Project $project, $data): bool {
        $trainsetNeeded = $data['trainset_needed'];
        $this->createTrainsets($project, $trainsetNeeded);

        return true;
    }

    protected function getRepositoryClass(): string {
        return ProjectRepositoryInterface::class;
    }
}
