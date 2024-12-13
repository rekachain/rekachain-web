<?php

namespace App\Http\Controllers;

use App\Helpers\PermissionHelper;
use App\Http\Requests\Project\Carriage\CarriageProjectRequest;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\Trainset\TrainsetProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\CarriagePanelComponentResource;
use App\Http\Resources\CarriagePanelResource;
use App\Http\Resources\CarriageResource;
use App\Http\Resources\CarriageTrainsetResource;
use App\Http\Resources\ComponentResource;
use App\Http\Resources\PanelResource;
use App\Http\Resources\PresetTrainsetResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TrainsetResource;
use App\Models\Carriage;
use App\Models\CarriagePanel;
use App\Models\CarriagePanelComponent;
use App\Models\CarriageTrainset;
use App\Models\Panel;
use App\Models\Project;
use App\Models\Trainset;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\Services\CarriagePresetServiceInterface;
use App\Support\Interfaces\Services\PresetTrainsetServiceInterface;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class ProjectController extends Controller {
    public function __construct(
        protected ProjectServiceInterface $projectService,
        protected CarriagePresetServiceInterface $carriagePresetService,
        protected PresetTrainsetServiceInterface $presetTrainsetService) {
        //
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        PermissionHelper::check(PermissionEnum::PROJECT_READ);
        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);

                return ProjectResource::collection($this->projectService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('Project/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        PermissionHelper::check(PermissionEnum::PROJECT_CREATE);

        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request) {
        PermissionHelper::check(PermissionEnum::PROJECT_CREATE);
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_PROJECT_IMPORT_PROJECT_TEMPLATE->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_IMPORT);

                    return $this->projectService->importProject($request->file('file'), $request->validated());
            }

            return $this->projectService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Project $project) {
        PermissionHelper::check(PermissionEnum::PROJECT_READ);

        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGES->value:
                return CarriageResource::collection($project->carriages()->distinct()->get());
            case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGES_WITH_QTY->value:
                return ProjectResource::make($project);
            case IntentEnum::WEB_PROJECT_GET_ALL_PANELS->value:
                return PanelResource::collection($project->panels()->distinct()->get()); // $project->panels;
            case IntentEnum::WEB_PROJECT_GET_ALL_PANELS_WITH_QTY->value:
                return ProjectResource::make($project);
            case IntentEnum::WEB_PROJECT_GET_ALL_COMPONENTS->value:
                return ComponentResource::collection($project->components()->distinct()->get()); // $project->components;
            case IntentEnum::WEB_PROJECT_GET_ALL_COMPONENTS_WITH_QTY->value:
                return ProjectResource::make($project);
        }
        $project = new ProjectResource($project->load(['trainsets' => ['carriages']]));

        if ($this->ajax()) {
            return $project;
        }

        return inertia('Project/Show', ['project' => $project]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project) {
        PermissionHelper::check(PermissionEnum::PROJECT_UPDATE);

        return inertia('Project/Edit', ['project' => new ProjectResource($project)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project) {
        PermissionHelper::check(PermissionEnum::PROJECT_UPDATE);

        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_PROJECT_ADD_TRAINSET->value:
                PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_CREATE);

                return $this->projectService->addTrainsets($project, $request->validated());
            case IntentEnum::WEB_PROJECT_IMPORT_PANEL_PROGRESS_AND_MATERIAL->value:
                PermissionHelper::check(PermissionEnum::PROJECT_PANEL_IMPORT);

                return $this->projectService->importProjectPanelProgressMaterial($project, $request->file('file'), $request->validated());
            case IntentEnum::WEB_PROJECT_IMPORT_COMPONENT_PROGRESS_AND_MATERIAL->value:
                PermissionHelper::check(PermissionEnum::PROJECT_COMPONENT_IMPORT);

                return $this->projectService->importProjectComponentProgressMaterial($project, $request->file('file'), $request->validated());
            case IntentEnum::WEB_PROJECT_UPDATE_INITIAL_DATE->value:
                return $this->projectService->updateEstimatedStartDate($project, $request->validated());
        }

        if ($this->ajax()) {
            return $this->projectService->update($project, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Project $project) {
        PermissionHelper::check(PermissionEnum::PROJECT_DELETE);
        if ($this->ajax()) {
            return $this->projectService->delete($project);
        }
    }

    public function getEstimatedTime($project_id = null) {
        PermissionHelper::check(PermissionEnum::PROJECT_READ);

        return $this->projectService->calculateEstimatedTime($project_id);
    }

    public function project_trainsets(Request $request, Project $project) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_READ);
        $project = new ProjectResource($project->load(['trainsets' => ['carriages']]));
        if ($this->ajax()) {
            return $project;
        }

        return inertia('Project/Trainset/Index', ['project' => $project]);
    }

    public function project_trainset(TrainsetProjectRequest $request, Project $project, Trainset $trainset) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_READ);
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                // resources
                case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_COMPONENT_READ);

                    return ComponentResource::collection($project->components()->whereTrainsetId($trainset->id)->distinct()->get());
                case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS_WITH_QTY->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_COMPONENT_READ);

                    return ProjectResource::make($project)->projectTrainset($trainset);
                case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_PANELS->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_PANEL_READ);

                    return PanelResource::collection($project->panels()->whereTrainsetId($trainset->id)->distinct()->get());
                case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_PANELS_WITH_QTY->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_PANEL_READ);

                    return ProjectResource::make($project)->projectTrainset($trainset);

                    // services
                case IntentEnum::WEB_PROJECT_IMPORT_TRAINSET_PANEL_PROGRESS_AND_MATERIAL->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_PANEL_IMPORT);

                    return $this->projectService->importProjectTrainsetPanelProgressMaterial($project, $trainset, $request->file('file'), $request->validated());
                case IntentEnum::WEB_PROJECT_IMPORT_TRAINSET_COMPONENT_PROGRESS_AND_MATERIAL->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_COMPONENT_IMPORT);

                    return $this->projectService->importProjectTrainsetComponentProgressMaterial($project, $trainset, $request->file('file'), $request->validated());
            }

            return [
                'project' => new ProjectResource($project),
                'trainset' => new TrainsetResource($trainset->load(['carriages'])),
            ];
        }
        $project = new ProjectResource($project);
        $trainset = new TrainsetResource($trainset->load(['carriages']));

        return inertia('Project/Trainset/Show', ['project' => $project, 'trainset' => $trainset]);
    }

    public function project_carriages(Request $request, Project $project) {
        PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_READ);
        $project = new ProjectResource($project);

        if ($this->ajax()) {
            return [
                'project' => $project,
            ];
        }

        return inertia('Project/Carriage/Index', compact('project'));
    }

    public function project_carriage(CarriageProjectRequest $request, Project $project, Carriage $carriage) {
        PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_READ);
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                // resources
                case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_COMPONENT_READ);

                    return ComponentResource::collection($project->components()->whereCarriageId($carriage->id)->distinct()->get());
                case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS_WITH_QTY->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_COMPONENT_READ);

                    return ProjectResource::make($project)->projectCarriage($carriage);
                case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_PANELS->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_PANEL_READ);

                    return PanelResource::collection($project->panels()->whereCarriageId($carriage->id)->distinct()->get());
                case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_PANELS_WITH_QTY->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_PANEL_READ);

                    return ProjectResource::make($project)->projectCarriage($carriage);

                    // services
                case IntentEnum::WEB_PROJECT_IMPORT_CARRIAGE_PANEL_PROGRESS_AND_MATERIAL->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_PANEL_IMPORT);

                    return $this->projectService->importProjectCarriagePanelProgressMaterial($project, $carriage, $request->file('file'), $request->validated());
                case IntentEnum::WEB_PROJECT_IMPORT_CARRIAGE_COMPONENT_PROGRESS_AND_MATERIAL->value:
                    PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_COMPONENT_IMPORT);

                    return $this->projectService->importProjectCarriageComponentProgressMaterial($project, $carriage, $request->file('file'), $request->validated());
            }

            return [
                'project' => new ProjectResource($project),
                'carriage' => new CarriageResource($carriage),
            ];
        }
        $project = new ProjectResource($project);
        $carriage = new CarriageResource($carriage);

        return inertia('Project/Carriage/Component/Index', compact('project', 'carriage'));
    }

    public function project_carriage_components(Request $request, Project $project, Carriage $carriage) {
        PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_COMPONENT_READ);
        $project = new ProjectResource($project);
        $carriage = new CarriageResource($carriage);
        if ($this->ajax()) {
            return [
                'project' => $project,
                'carriage' => $carriage,
            ];
        }

        return inertia('Project/Carriage/Component/Index', compact('project', 'carriage'));
    }

    public function project_carriage_panels(Request $request, Project $project, Carriage $carriage) {
        PermissionHelper::check(PermissionEnum::PROJECT_CARRIAGE_PANEL_READ);
        $project = new ProjectResource($project);
        $carriage = new CarriageResource($carriage);
        if ($this->ajax()) {
            return [
                'project' => $project,
                'carriage' => $carriage,
            ];
        }

        return inertia('Project/Carriage/Panel/Index', compact('project', 'carriage'));
    }

    public function project_components(Request $request, Project $project) {
        PermissionHelper::check(PermissionEnum::PROJECT_COMPONENT_READ);
        $project = new ProjectResource($project);

        if ($this->ajax()) {
            return [
                'project' => $project,
            ];
        }

        return inertia('Project/Component/Index', compact('project'));
    }

    public function project_panels(Request $request, Project $project) {
        PermissionHelper::check(PermissionEnum::PROJECT_PANEL_READ);
        $project = new ProjectResource($project);

        if ($this->ajax()) {
            return [
                'project' => $project,
            ];
        }

        return inertia('Project/Panel/Index', compact('project'));
    }

    public function project_trainset_components(Request $request, Project $project, Trainset $trainset) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_COMPONENT_READ);
        $project = new ProjectResource($project);
        $trainset = new TrainsetResource($trainset);

        if ($this->ajax()) {
            return [
                'project' => $project,
                'trainset' => $trainset,
            ];
        }

        return inertia('Project/Trainset/Component/Index', compact('project', 'trainset'));
    }

    public function project_trainset_panels(Request $request, Project $project, Trainset $trainset) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_PANEL_READ);
        $project = new ProjectResource($project);
        $trainset = new TrainsetResource($trainset);

        if ($this->ajax()) {
            return [
                'project' => $project,
                'trainset' => $trainset,
            ];
        }
        // return ;

        return inertia('Project/Trainset/Panel/Index', compact('project', 'trainset'));
    }

    public function project_trainset_carriageTrainsets(Request $request, Project $project, Trainset $trainset) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_CARRIAGE_TRAINSET_READ);
        $project = new ProjectResource($project);
        $trainset = new TrainsetResource($trainset->load(['carriage_trainsets' => ['carriage_panels' => ['panel', 'panel_attachments' => ['serial_panels']], 'carriage']]));
        // sementara
        $presetTrainsets = PresetTrainsetResource::collection($this->presetTrainsetService->with(['carriage_presets' => [
            'carriage',
        ]])->getAll([
            'project_id' => $project->id,
        ]));

        if ($this->ajax()) {
            return [
                'project' => $project,
                'trainset' => $trainset,
                'presetTrainsets' => $presetTrainsets,
            ];
        }

        return inertia('Project/Trainset/CarriageTrainset/Index', compact('project', 'trainset', 'presetTrainsets'));
    }

    public function project_trainset_carriageTrainset(Request $request, Project $project, Trainset $trainset, Carriage $carriage) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_CARRIAGE_TRAINSET_READ);
        $carriage = new CarriageResource($carriage);

        return inertia('Project/Trainset/CarriageTrainset/Show', ['carriage' => $carriage]);
    }

    public function project_trainset_carriageTrainset_carriagePanels(Request $request, Project $project, Trainset $trainset, CarriageTrainset $carriageTrainset) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_READ);
        $carriageTrainset = CarriageTrainsetResource::make($carriageTrainset->load(['carriage_panels' => ['panel', 'progress' => ['progress_steps' => ['step']], 'carriage_panel_components' => ['component']], 'carriage']));
        $project = ProjectResource::make($project);
        $trainset = TrainsetResource::make($trainset);

        if ($this->ajax()) {
            return compact('project', 'trainset', 'carriageTrainset');
        }

        return inertia('Project/Trainset/CarriageTrainset/CarriagePanel/Index', compact('project', 'trainset', 'carriageTrainset'));
    }

    public function project_trainset_carriageTrainset_carriagePanel_carriagePanelComponents(Request $request, Project $project, Trainset $trainset, CarriageTrainset $carriageTrainset, CarriagePanel $carriagePanel) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_READ);
        $carriageTrainset = CarriageTrainsetResource::make($carriageTrainset->load(['carriage_panels' => ['panel', 'progress', 'carriage_panel_components' => ['component']], 'carriage']));
        $carriagePanel = new CarriagePanelResource($carriagePanel->load(['panel', 'carriage_panel_components' => ['progress' => ['progress_steps' => ['step']], 'component', 'component_materials' => ['raw_material']]]));
        $project = ProjectResource::make($project);
        $trainset = TrainsetResource::make($trainset);

        if ($this->ajax()) {
            return compact('project', 'trainset', 'carriageTrainset', 'carriagePanel');
        }

        return inertia('Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/Index', compact('project', 'trainset', 'carriageTrainset', 'carriagePanel'));
    }

    public function project_trainset_carriageTrainset_carriagePanel_carriagePanelComponent_componentMaterials(Request $request, Project $project, Trainset $trainset, CarriageTrainset $carriageTrainset, CarriagePanel $carriagePanel, CarriagePanelComponent $carriagePanelComponent) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_READ);
        $carriageTrainset = CarriageTrainsetResource::make($carriageTrainset->load(['carriage_panels' => ['panel', 'progress', 'carriage_panel_components' => ['component']], 'carriage']));
        $carriagePanel = new CarriagePanelResource($carriagePanel->load(['panel', 'carriage_panel_components' => ['progress', 'component', 'component_materials' => ['raw_material']]]));
        $carriagePanelComponent = new CarriagePanelComponentResource($carriagePanelComponent->load(['component', 'component_materials' => ['raw_material']]));
        $project = ProjectResource::make($project);
        $trainset = TrainsetResource::make($trainset);

        if ($this->ajax()) {
            return compact('project', 'trainset', 'carriageTrainset', 'carriagePanel', 'carriagePanelComponent');
        }

        return inertia('Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/ComponentMaterial/Index', compact('project', 'trainset', 'carriageTrainset', 'carriagePanel', 'carriagePanelComponent'));
    }

    public function project_trainset_carriageTrainset_carriagePanel_panelMaterials(Request $request, Project $project, Trainset $trainset, CarriageTrainset $carriageTrainset, CarriagePanel $carriagePanel) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_READ);
        $carriageTrainset = CarriageTrainsetResource::make($carriageTrainset->load(['carriage_panels' => ['panel', 'progress', 'carriage_panel_components' => ['component']], 'carriage']));
        $carriagePanel = new CarriagePanelResource($carriagePanel->load(['panel', 'panel_materials' => ['raw_material']]));
        $project = ProjectResource::make($project);
        $trainset = TrainsetResource::make($trainset);

        if ($this->ajax()) {
            return compact('project', 'trainset', 'carriageTrainset', 'carriagePanel');
        }

        return inertia('Project/Trainset/CarriageTrainset/CarriagePanel/PanelMaterial/Index', compact('project', 'trainset', 'carriageTrainset', 'carriagePanel'));
    }

    public function panel(Request $request, Project $project, Trainset $trainset, Carriage $carriage, Panel $panel) {
        PermissionHelper::check(PermissionEnum::PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_READ);
        $panel = new PanelResource($panel);

        return inertia('Project/Trainset/CarriageTrainset/CarriagePanel/Show', ['panel' => $panel]);
    }
}
