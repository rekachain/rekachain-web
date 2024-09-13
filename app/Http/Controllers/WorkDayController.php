<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkDay\StoreWorkDayRequest;
use App\Http\Requests\WorkDay\UpdateWorkDayRequest;
use App\Http\Resources\WorkDayResource;
use App\Models\WorkDay;
use App\Support\Interfaces\Services\WorkDayServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class WorkDayController extends Controller {
    public function __construct(protected WorkDayServiceInterface $workDayService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);

                return WorkDayResource::collection($this->workDayService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('WorkDay/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('WorkDay/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkDayRequest $request) {
        if ($this->ajax()) {
            return $this->workDayService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(WorkDay $workDay) {
        if ($this->ajax()) {
            return new WorkDayResource($workDay);
        }

        return inertia('WorkDay/Show', ['workDay' => new WorkDayResource($workDay)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WorkDay $workDay) {
        return inertia('WorkDay/Edit', ['workDay' => new WorkDayResource($workDay)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkDayRequest $request, WorkDay $workDay) {
        if ($this->ajax()) {
            return $this->workDayService->update($workDay, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, WorkDay $workDay) {
        if ($this->ajax()) {
            return $this->workDayService->delete($workDay);
        }
    }
}
