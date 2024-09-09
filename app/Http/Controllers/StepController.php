<?php

namespace App\Http\Controllers;

use App\Models\Step;
use Illuminate\Http\Request;
use App\Http\Resources\StepResource;
use App\Http\Requests\Step\StoreStepRequest;
use App\Http\Requests\Step\UpdateStepRequest;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Container\ContainerExceptionInterface;
use App\Support\Interfaces\Services\StepServiceInterface;

class StepController extends Controller
{
    public function __construct(protected StepServiceInterface $stepsService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = request()->get('perPage', 5);
        return StepResource::collection($this->stepsService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStepRequest $request)
    {
        return $this->stepsService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Step $step)
    {
        return new StepResource($step);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $perPage = request()->get('perPage', 5);

        return StepResource::collection($this->stepsService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Step $step)
    // {
    //     return $this->stepsService->update($step, $request->validated());
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Step $step)
    {
        return $this->stepsService->delete($step);
    }
}