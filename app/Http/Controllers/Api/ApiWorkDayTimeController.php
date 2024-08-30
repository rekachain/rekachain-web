<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkDayTime\StoreWorkDayTimeRequest;
use App\Http\Requests\WorkDayTime\UpdateWorkDayTimeRequest;
use App\Http\Resources\WorkDayTimeResource;
use App\Models\WorkDayTime;
use App\Support\Interfaces\Services\WorkDayTimeServiceInterface;
use Illuminate\Http\Request;

class ApiWorkDayTimeController extends Controller {
    public function __construct(
        protected WorkDayTimeServiceInterface $workDayTimeService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 15);

        return WorkDayTimeResource::collection(
            $this->workDayTimeService->getAllPaginated($request->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkDayTimeRequest $request) {
        return $this->workDayTimeService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, WorkDayTime $workDayTime) {
        return WorkDayTimeResource::make($workDayTime);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkDayTimeRequest $request, WorkDayTime $workDayTime) {
        return $this->workDayTimeService->update($workDayTime, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkDayTime $workDayTime) {
        return $this->workDayTimeService->delete($workDayTime);
    }
}
