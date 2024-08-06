<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Support\Interfaces\ProjectServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class ProjectController extends Controller
{
    public function __construct(protected ProjectServiceInterface $projectService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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
    public function create()
    {
        return intertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($this->ajax()) {
            return $this->projectService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        if ($this->ajax()) {
            return new ProjectResource($project);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return intertia('Project/Edit', ['project' => new ProjectResource($project)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        if ($this->ajax()) {
            return $this->projectService->update($request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Project $project)
    {
        if ($this->ajax()) {
            return $this->projectService->delete($project);
        }
    }
}
