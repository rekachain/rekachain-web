<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Support\Enums\PermissionEnum;
use App\Support\Interfaces\ProjectServiceInterface;
use Illuminate\Http\Request;
use Log;

class ApiProjectController extends Controller
{
    public function __construct(
        protected ProjectServiceInterface $projectService
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $request->checkPermissionEnum(PermissionEnum::PROJECT_READ);
        $perPage = request()->get('perPage', 15);
        return ProjectResource::collection(
            $this->projectService->getAllPaginated($request->query(), $perPage)
        )->additional(['message' => 'Success']);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        // $request->checkPermissionEnum(PermissionEnum::PROJECT_CREATE);
        return $this->projectService->create($request->validated());
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // $request->checkPermissionEnum(PermissionEnum::PROJECT_READ);
        return new ProjectResource($project);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        // $request->checkPermissionEnum(PermissionEnum::PROJECT_UPDATE);
        return $this->projectService->update($project, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
