<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use Illuminate\Http\Request;

class ApiProjectController extends Controller {
    public function __construct(
        protected ProjectServiceInterface $projectService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        // PermissionHelper::check(PermissionEnum::PROJECT_READ);
        $perPage = request()->get('perPage', 15);

        return ProjectResource::collection(
            $this->projectService->getAllPaginated($request->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request) {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::API_PROJECT_IMPORT_PROJECT_TEMPLATE->value:
                $this->projectService->importProject($request->file('file'), $request->validated());

                return response()->json(['message' => 'Success'], 200);
            default:
                return $this->projectService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project) {
        // PermissionHelper::check(PermissionEnum::PROJECT_READ);
        return new ProjectResource($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project) {
        // PermissionHelper::check(PermissionEnum::PROJECT_UPDATE);
        return $this->projectService->update($project, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
