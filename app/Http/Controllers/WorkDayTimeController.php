<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkDayTime\StoreWorkDayTimeRequest;
use App\Http\Requests\WorkDayTime\UpdateWorkDayTimeRequest;
use App\Http\Resources\WorkDayTimeResource;
use App\Models\WorkDayTime;
use App\Support\Interfaces\Services\WorkDayTimeServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class WorkDayTimeController extends Controller {
    public function __construct(protected WorkDayTimeServiceInterface $workDayTimeService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);

                return WorkDayTimeResource::collection($this->workDayTimeService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('WorkDayTime/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('WorkDayTime/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkDayTimeRequest $request) {
        if ($this->ajax()) {
            return $this->workDayTimeService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(WorkDayTime $workDayTime) {
        if ($this->ajax()) {
            return new WorkDayTimeResource($workDayTime);
        }

        return inertia('WorkDayTime/Show', ['workDayTime' => new WorkDayTimeResource($workDayTime)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WorkDayTime $workDayTime) {
        return inertia('WorkDayTime/Edit', ['workDayTime' => new WorkDayTimeResource($workDayTime)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkDayTimeRequest $request, WorkDayTime $workDayTime) {
        if ($this->ajax()) {
            return $this->workDayTimeService->update($workDayTime, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, WorkDayTime $workDayTime) {
        if ($this->ajax()) {
            return $this->workDayTimeService->delete($workDayTime);
        }
    }
}
