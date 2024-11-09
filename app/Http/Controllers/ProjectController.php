<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\Carriage\CarriageProjectRequest;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\CarriageResource;
use App\Http\Resources\CarriageTrainsetResource;
use App\Http\Resources\ComponentResource;
use App\Http\Resources\PanelResource;
use App\Http\Resources\PresetTrainsetResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TrainsetResource;
use App\Models\Carriage;
use App\Models\CarriageTrainset;
use App\Models\Panel;
use App\Models\Project;
use App\Models\Trainset;
use App\Support\Enums\IntentEnum;
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
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_PROJECT_IMPORT_PROJECT_TEMPLATE->value:
                    return $this->projectService->importProject($request->file('file'));
            }

            return $this->projectService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Project $project) {

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
        return inertia('Project/Edit', ['project' => new ProjectResource($project)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project) {

        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_PROJECT_ADD_TRAINSET->value:
                return $this->projectService->addTrainsets($project, $request->validated());
            case IntentEnum::WEB_PROJECT_IMPORT_PANEL_PROGRESS_AND_MATERIAL->value:
                return $this->projectService->importProjectPanelProgressMaterial($project, $request->file('file'), $request->validated());
            case IntentEnum::WEB_PROJECT_IMPORT_COMPONENT_PROGRESS_AND_MATERIAL->value:
                return $this->projectService->importProjectComponentProgressMaterial($project, $request->file('file'), $request->validated());
        }

        if ($this->ajax()) {
            return $this->projectService->update($project, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Project $project) {
        if ($this->ajax()) {
            return $this->projectService->delete($project);
        }
    }

    public function project_trainsets(Request $request, Project $project) {
        $project = new ProjectResource($project->load(['trainsets' => ['carriages']]));
        if ($this->ajax()) {
            return $project;
        }

        return inertia('Project/Trainset/Index', ['project' => $project]);
    }

    public function project_trainset(Request $request, Project $project, Trainset $trainset) {
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch($intent) {
                // resources
                case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS->value:
                    return ComponentResource::collection($project->components()->whereTrainsetId($trainset->id)->distinct()->get());
                case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS_WITH_QTY->value:
                    return ProjectResource::make($project)->projectTrainset($trainset);
                case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_PANELS->value:
                    return PanelResource::collection($project->panels()->whereTrainsetId($trainset->id)->distinct()->get());
                case IntentEnum::WEB_PROJECT_GET_ALL_TRAINSET_PANELS_WITH_QTY->value:
                    return ProjectResource::make($project)->projectTrainset($trainset);

                // services
                case IntentEnum::WEB_PROJECT_IMPORT_TRAINSET_PANEL_PROGRESS_AND_MATERIAL->value:
                    return $this->projectService->importProjectTrainsetPanelProgressMaterial($project, $trainset, $request->file('file'), $request->validated());
                case IntentEnum::WEB_PROJECT_IMPORT_TRAINSET_COMPONENT_PROGRESS_AND_MATERIAL->value:
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
        $project = new ProjectResource($project);

        if ($this->ajax()) {
            return [
                'project' => $project,
            ];
        }

        return inertia('Project/Carriage/Index', compact('project'));
    }

    public function project_carriage(CarriageProjectRequest $request, Project $project, Carriage $carriage) {
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                // resources
                case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS->value:
                    return ComponentResource::collection($project->components()->whereCarriageId($carriage->id)->distinct()->get());
                case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS_WITH_QTY->value:
                    return ProjectResource::make($project)->projectCarriage($carriage);
                case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_PANELS->value:
                    return PanelResource::collection($project->panels()->whereCarriageId($carriage->id)->distinct()->get());
                case IntentEnum::WEB_PROJECT_GET_ALL_CARRIAGE_PANELS_WITH_QTY->value:
                    return ProjectResource::make($project)->projectCarriage($carriage);

                // services
                case IntentEnum::WEB_PROJECT_IMPORT_CARRIAGE_PANEL_PROGRESS_AND_MATERIAL->value:
                    return $this->projectService->importProjectCarriagePanelProgressMaterial($project, $carriage, $request->file('file'), $request->validated());
                case IntentEnum::WEB_PROJECT_IMPORT_CARRIAGE_COMPONENT_PROGRESS_AND_MATERIAL->value:
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
        $project = new ProjectResource($project);

        if ($this->ajax()) {
            return [
                'project' => $project,
            ];
        }

        return inertia('Project/Component/Index', compact('project'));
    }

    public function project_panels(Request $request, Project $project) {
        $project = new ProjectResource($project);

        if ($this->ajax()) {
            return [
                'project' => $project,
            ];
        }

        return inertia('Project/Panel/Index', compact('project'));
    }

    public function project_trainset_components(Request $request, Project $project, Trainset $trainset) {
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
        $project = new ProjectResource($project);
        $trainset = new TrainsetResource($trainset);

        if ($this->ajax()) {
            return [
                'project' => $project,
                'trainset' => $trainset,
            ];
        }

        return inertia('Project/Trainset/Panel/Index', compact('project', 'trainset'));
    }

    public function project_trainset_carriageTrainsets(Request $request, Project $project, Trainset $trainset) {
        $project = new ProjectResource($project);
        $trainset = new TrainsetResource($trainset->load(['carriage_trainsets' => ['carriage_panels' => ['panel', 'panel_attachment' => ['serial_panels']], 'carriage']]));
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

        return inertia('Project/Trainset/Carriage/Index', compact('project', 'trainset', 'presetTrainsets'));
    }

    public function project_trainset_carriageTrainset(Request $request, Project $project, Trainset $trainset, Carriage $carriage) {
        $carriage = new CarriageResource($carriage);

        return inertia('Project/Trainset/Carriage/Show', ['carriage' => $carriage]);
    }

    public function project_trainset_carriageTrainset_panels(Request $request, Project $project, Trainset $trainset, CarriageTrainset $carriageTrainset) {
        $carriageTrainset = CarriageTrainsetResource::make($carriageTrainset->load(['carriage_panels' => ['panel', 'progress', 'carriage_panel_components' => ['component']], 'carriage']));
        $project = ProjectResource::make($project);
        $trainset = TrainsetResource::make($trainset);

        if ($this->ajax()) {
            return compact('project', 'trainset', 'carriageTrainset');
        }

        return inertia('Project/Trainset/Carriage/Panel/Index', compact('project', 'trainset', 'carriageTrainset'));
    }

    public function panel(Request $request, Project $project, Trainset $trainset, Carriage $carriage, Panel $panel) {
        $panel = new PanelResource($panel);

        return inertia('Project/Trainset/Carriage/Panel/Show', ['panel' => $panel]);
    }
}
