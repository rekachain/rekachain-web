<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkDay\StoreWorkDayRequest;
use App\Http\Requests\WorkDay\UpdateWorkDayRequest;
use App\Http\Resources\WorkDayResource;
use App\Models\WorkDay;
use App\Support\Interfaces\Services\WorkDayServiceInterface;
use Illuminate\Http\Request;

class ApiWorkDayController extends Controller {
    public function __construct(
        protected WorkDayServiceInterface $workDayService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 15);

        return WorkDayResource::collection(
            $this->workDayService->getAllPaginated($request->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkDayRequest $request) {
        return $this->workDayService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, WorkDay $workDay) {
        return WorkDayResource::make($workDay->load('work_day_times'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkDayRequest $request, WorkDay $workDay) {
        return $this->workDayService->update($workDay, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkDay $workDay) {
        return $this->workDayService->delete($workDay);
    }
}
