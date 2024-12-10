<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkDayTime\StoreWorkDayTimeRequest;
use App\Http\Requests\WorkDayTime\UpdateWorkDayTimeRequest;
use App\Http\Resources\WorkDayResource;
use App\Http\Resources\WorkDayTimeResource;
use App\Models\WorkDay;
use App\Models\WorkDayTime;
use App\Support\Enums\PermissionEnum;
use App\Helpers\PermissionHelper;
use App\Support\Interfaces\Services\WorkDayTimeServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class WorkDayTimeController extends Controller {
    public function __construct(protected WorkDayTimeServiceInterface $workDayTimeService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(WorkDay $workDay, Request $request) {
        PermissionHelper::check(PermissionEnum::WORK_DAY_TIME_READ);
        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);

                return WorkDayTimeResource::collection($workDay->workDayTimes()->paginate($request->get('perPage', 5)));
                // return WorkDayTimeResource::collection($this->workDayTimeService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('WorkDay/WorkDayTime/Index', [
            'workDay' => new WorkDayResource($workDay),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(WorkDay $workDay) {
        PermissionHelper::check(PermissionEnum::WORK_DAY_TIME_CREATE);
        return inertia('WorkDay/WorkDayTime/Create', [
            'workDay' => new WorkDayResource($workDay),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WorkDay $workDay, StoreWorkDayTimeRequest $request) {
        PermissionHelper::check(PermissionEnum::WORK_DAY_TIME_CREATE);
        if ($this->ajax()) {
            $data = array_merge($request->validated(), ['work_day_id' => $workDay->id]);

            return $this->workDayTimeService->create($data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(WorkDayTime $workDayTime) {
        PermissionHelper::check(PermissionEnum::WORK_DAY_TIME_READ);
        if ($this->ajax()) {
            return new WorkDayTimeResource($workDayTime);
        }

        return inertia('WorkDayTime/Show', ['workDayTime' => new WorkDayTimeResource($workDayTime)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WorkDay $workDay, WorkDayTime $workDayTime) {
        PermissionHelper::check(PermissionEnum::WORK_DAY_TIME_UPDATE);
        return inertia('WorkDay/WorkDayTime/Edit', [
            'workDay' => new WorkDayResource($workDay),
            'workDayTime' => new WorkDayTimeResource($workDayTime),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WorkDay $workDay, UpdateWorkDayTimeRequest $request, WorkDayTime $workDayTime) {
        PermissionHelper::check(PermissionEnum::WORK_DAY_TIME_UPDATE);
        if ($this->ajax()) {
            $data = array_merge($request->validated(), ['work_day_id' => $workDay->id]);

            return $this->workDayTimeService->update($workDayTime, $data);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkDay $workDay, Request $request, WorkDayTime $workDayTime) {
        PermissionHelper::check(PermissionEnum::WORK_DAY_TIME_DELETE);
        if ($this->ajax()) {
            return $this->workDayTimeService->delete($workDayTime);
        }
    }
}
