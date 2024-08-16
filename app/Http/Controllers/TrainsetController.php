<?php

namespace App\Http\Controllers;

use App\Http\Requests\Trainset\StoreTrainsetRequest;
use App\Http\Requests\Trainset\UpdateTrainsetRequest;
use App\Http\Resources\TrainsetResource;
use App\Models\Trainset;
use App\Support\Interfaces\TrainsetServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class TrainsetController extends Controller
{
    public function __construct(protected TrainsetServiceInterface $trainsetService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);
                return TrainsetResource::collection($this->trainsetService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }
        return inertia('Trainset/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainsetRequest $request)
    {
        if($this->ajax()) {
            return $this->trainsetService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Trainset $trainset)
    {
        if ($this->ajax()) {
            return new TrainsetResource($trainset);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trainset $trainset)
    {
        return inertia('Trainset/Edit', ['trainset' => new TrainsetResource($trainset)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Trainset $trainset)
    {
        if ($this->ajax()) {
            return $this->trainsetService->update($trainset, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Trainset $trainset)
    {
        if ($this->ajax()) {
            return $this->trainsetService->delete($trainset);
        }
    }
}
