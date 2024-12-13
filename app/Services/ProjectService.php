<?php

namespace App\Services;

use App\Imports\CarriagePanel\CarriagePanelProgressMaterialImport;
use App\Imports\CarriagePanelComponent\CarriagePanelComponentProgressMaterialImport;
use App\Imports\Project\ProjectsImport;
use App\Models\Carriage;
use App\Models\Project;
use App\Models\Trainset;
use App\Support\Enums\ProjectStatusEnum;
use App\Support\Interfaces\Repositories\ProjectRepositoryInterface;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class ProjectService extends BaseCrudService implements ProjectServiceInterface {
    private function createTrainsets(Project $project, $trainsetNeeded): void {
        if ($trainsetNeeded <= 0) {
            return;
        }

        $trainsets = collect(range(1, $trainsetNeeded))
            ->map(fn ($i) => ['project_id' => $project->id])
            ->toArray();

        $this->trainsetService()->createMany($trainsets);
    }

    public function create(array $data): ?Model {
        $project = parent::create($data);

        $this->createTrainsets($project, $data['trainset_needed']);

        return $project;
    }

    public function importProject(UploadedFile $file, array $data): bool {
        $buyer = null;
        if (array_key_exists('buyer_id', $data)) {
            $buyer = $this->userService()->findOrFail($data['buyer_id']);
        }
        Excel::import(new ProjectsImport($file, $buyer), $file);

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

        if ($project_id) {
            $project = \App\Models\Project::with(['trainsets.carriage_trainsets' => [
                'carriage_panels' => [
                    'progress.steps',
                ],
            ]])->findOrFail($project_id);

            // Get project start date
            $startDate = $project->estimated_start_date; // Assuming you have estimated_start_date in your Project model
            $endDate = Carbon::parse($startDate);
            $totalCalculatedEstimatedTime = 0;
            $lastTrainset = $project->trainsets->last();

            foreach ($project->trainsets as $trainset) {
                $mechanicTime = 0;
                $electricalTime = 0;
                $assemblyTime = 0;

                foreach ($trainset->carriage_trainsets as $carriageTrainset) {
                    foreach ($carriageTrainset->carriage_panels as $carriagePanel) {
                        $stepTime = 0;
                        foreach ($carriagePanel->progress->steps as $step) {
                            $stepTime = $step->estimated_time * $carriagePanel->qty * $carriageTrainset->qty;
                        }

                        switch ($carriagePanel->progress->work_aspect_id) {
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

                $totalTime = max($mechanicTime, $electricalTime) + $assemblyTime;

                $minutesPerWorkingDay = 8 * 60; // 8 hours * 60 minutes
                $calculatedEstimateTime = ceil($totalTime / $minutesPerWorkingDay);

                // Add working days considering only Monday-Friday
                for ($i = 0; $i < $calculatedEstimateTime; $i++) {
                    $endDate->addDay();
                    // Skip weekends
                    while ($endDate->isWeekend()) {
                        $endDate->addDay();
                    }
                }
                $totalCalculatedEstimatedTime += $calculatedEstimateTime;

            }

            // Save calculated estimate time and end date to the project
            $project->update([
                'calculated_estimate_time' => $totalCalculatedEstimatedTime,
                'calculated_end_date' => $endDate->format('Y-m-d'),
            ]);

            foreach ($project->trainsets as $trainset) {
                $this->trainsetService()->calculateEstimatedTime($trainset->id);
            }

            return true;

            // return response()->json([
            //     'project_id' => $project_id,
            //     'mechanical_time' => $mechanicTime,
            //     'electrical_time' => $electricalTime,
            //     'assembly_time' => $assemblyTime,
            //     'total_estimated_time' => $totalTime,
            //     'calculated_estimate_time' => $calculatedEstimateTime,
            //     'estimated_start_date' => $startDate,
            //     'estimated_end_date' => $endDate->format('Y-m-d')
            // ]);
        }

        return response()->json(['message' => 'Please provide project_id']);
    }

    public function updateEstimatedStartDate(Project $project, array $data): bool {
        // Get update initial date
        $endDate = Carbon::parse($data['estimated_start_date']);
        // $endDate = $startDate;
        // dd($project);
        // Add working days considering only Monday-Friday
        for ($i = 0; $i < $project->calculated_estimate_time; $i++) {
            $endDate->addDay();
            // Skip weekends
            while ($endDate->isWeekend()) {
                $endDate->addDay();
            }
        }

        $project->update([
            'estimated_start_date' => Carbon::parse($data['estimated_start_date'])->format('Y-m-d'),
            'calculated_end_date' => $endDate->format('Y-m-d')
        ]);

        $this->calculateEstimatedTime($project->id);

        return true;
    }

    public function updateProjectStartTime(Trainset $trainset) {
        $project = $trainset->project();
        $trainsets = $project->trainsets()->orderBy('id')->get();

        $currentTrainsetIndex = $trainsets->search(fn($t) => $t->id === $trainset->id);
        if ($currentTrainsetIndex === 0) {
            $project->update([
                'start_date' => now()->format('Y-m-d'),
            ]);
        }
    }

    public function updateProjectEndTime(Project $project) {
        $project->update([
            'end_date' => now()->format('Y-m-d'),
        ]);
    }

    public function updateProjectStatus(Project $project) {
        $trainsets = $project->trainsets()->get();
        $allTrainsetsDone = $trainsets->every(function ($trainset) {
            return $trainset->status === 'done';
        });

        if ($allTrainsetsDone) {
            $project->update([
                'status' => ProjectStatusEnum::DONE->value
            ]);
            $this->updateProjectEndTime($project);
        }

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
