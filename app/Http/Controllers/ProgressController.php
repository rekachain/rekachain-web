<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use Illuminate\Http\Request;
use App\Support\Enums\IntentEnum;
use App\Http\Resources\ProgressResource;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Container\ContainerExceptionInterface;
use App\Http\Requests\Progress\StoreProgressRequest;
use App\Http\Requests\Progress\UpdateProgressRequest;
use App\Support\Interfaces\Services\ProgressServiceInterface;

class ProgressController extends Controller {
    public function __construct(protected ProgressServiceInterface $progressService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_PROGRESS_GET_TEMPLATE_IMPORT_PROGRESS->value:
                    return $this->progressService->getImportDataTemplate();
            }
            
            try {
                $perPage = request()->get('perPage', 5);

                return ProgressResource::collection($this->progressService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        return inertia('Progress/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgressRequest $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_PROGRESS_IMPORT_PROGRESS->value:
                    $this->progressService->importData($request->file('import_file'));

                    return response()->noContent();
            }
            
            return $this->progressService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Progress $progress) {
        if ($this->ajax()) {
            return new ProgressResource($progress);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Progress $progress) {
        return inertia('Progress/Edit', ['progress' => new ProgressResource($progress)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgressRequest $request, Progress $progress) {
        if ($this->ajax()) {
            return $this->progressService->update($progress, $request->validated());

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Progress $progress) {
        if ($this->ajax()) {
            return $this->progressService->delete($progress);
        }
    }
}