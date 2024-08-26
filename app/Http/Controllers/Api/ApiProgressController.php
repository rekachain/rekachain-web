<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Progress\StoreProgressRequest;
use App\Http\Requests\Progress\UpdateProgressRequest;
use App\Http\Resources\ProgressResource;
use App\Models\Progress;
use App\Support\Interfaces\Services\ProgressServiceInterface;
use Illuminate\Http\Request;

class ApiProgressController extends Controller {
    public function __construct(
        protected ProgressServiceInterface $progressService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 15);

        return ProgressResource::collection(
            $this->progressService->getAllPaginated(request()->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgressRequest $request) {
        return $this->progressService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Progress $progress) {
        return new ProgressResource($progress);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgressRequest $request, Progress $progress) {
        return $this->progressService->update($progress, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Progress $progress) {
        //
    }
}
