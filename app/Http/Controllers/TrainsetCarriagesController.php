<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainsetCarriages\StoreTrainsetCarriagesRequest;
use App\Http\Requests\TrainsetCarriages\UpdateTrainsetCarriagesRequest;
use App\Http\Resources\TrainsetCarriagesResource;
use App\Models\TrainsetCarriages;
use App\Support\Interfaces\TrainsetCarriagesServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class TrainsetCarriagesController extends Controller
{
    public function __construct(protected TrainsetCarriagesServiceInterface $trainsetCarriagesService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);
                return TrainsetCarriagesResource::collection($this->trainsetCarriagesService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }
        return inertia('TrainsetCarriages/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if($this->ajax()) {
            return $this->trainsetCarriagesService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TrainsetCarriages $trainsetCarriages)
    {
        if ($this->ajax()) {
            return new TrainsetCarriagesResource($trainsetCarriages);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TrainsetCarriages $trainsetCarriages)
    {
        // return inertia('TrainsetCarriages/Edit', ['trainsetCarriages' => new TrainsetCarriagesResource($trainsetCarriages)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TrainsetCarriages $trainsetCarriages)
    {
        if ($this->ajax()) {
            return $this->trainsetCarriagesService->update($trainsetCarriages, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, TrainsetCarriages $trainsetCarriages)
    {
        if ($this->ajax()) {
            return $this->trainsetCarriagesService->delete($trainsetCarriages);
        }
    }
}
