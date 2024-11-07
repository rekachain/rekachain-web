<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Imports\CarriagePanel\CarriagePanelProgressMaterialImport;
use App\Imports\CarriagePanelComponent\CarriagePanelComponentProgressMaterialImport;
use App\Imports\Project\ProjectsImport;
use App\Models\Carriage;
use App\Models\Project;
use App\Support\Interfaces\Repositories\ProjectRepositoryInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

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
            Excel::import(new CarriagePanelProgressMaterialImport($carriagePanel, $data['override']  ?? null), $file);
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

    public function addTrainsets(Project $project, $data): bool {
        $trainsetNeeded = $data['trainset_needed'];
        $this->createTrainsets($project, $trainsetNeeded);

        return true;
    }

    protected function getRepositoryClass(): string {
        return ProjectRepositoryInterface::class;
    }
}
