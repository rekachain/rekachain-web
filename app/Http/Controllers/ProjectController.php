<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\CarriageResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TrainsetResource;
use App\Models\Project;
use App\Models\Trainset;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\ProjectServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class ProjectController extends Controller {
    public function __construct(protected ProjectServiceInterface $projectService) {}

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
            return $this->projectService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Project $project) {

        $project = new ProjectResource($project->load(['trainsets' => ['carriages']]));

        if ($this->ajax()) {
            return $project;
        }

        $intent = IntentEnum::WEB_PROJECT_GET_TRAINSETS->value;

        $request->merge(['intent' => $intent]);

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

        if ($intent == IntentEnum::WEB_PROJECT_ADD_TRAINSET->value) {
            return $this->projectService->addTrainsets($project, $request->get('trainset_needed'));
        }

        if ($this->ajax()) {
            return $this->projectService->update($request->validated());
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

    public function trainsets(Request $request, Project $project) {
        $project = new ProjectResource($project->load(['trainsets' => ['carriages']]));

        if ($this->ajax()) {
            return $project;
        }

        $intent = IntentEnum::WEB_PROJECT_GET_TRAINSETS->value;

        $request->merge(['intent' => $intent]);

        return inertia('Project/Trainset/Index', ['project' => $project]);
    }

    public function trainset(Request $request, Project $project, Trainset $trainset) {
        $trainset = new TrainsetResource($trainset->load(['carriages']));

        return inertia('Project/Trainset/Show', ['trainset' => $trainset]);
    }

    public function carriages(Request $request, Project $project, Trainset $trainset) {
        $trainset = new TrainsetResource($trainset->load(['carriages' => ['panels']]));

        return inertia('Project/Trainset/Carriage/Index', ['trainset' => $trainset]);
    }

    public function carriage(Request $request, Project $project, Trainset $trainset, Carriage $carriage) {
        $carriage = new CarriageResource($carriage);

        return inertia('Project/Trainset/Carriage/Show', ['carriage' => $carriage]);
    }
}
