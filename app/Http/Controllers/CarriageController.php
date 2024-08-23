<?php

namespace App\Http\Controllers;

use App\Http\Requests\Carriage\StoreCarriageRequest;
use App\Http\Requests\Carriage\UpdateCarriageRequest;
use App\Http\Resources\CarriageResource;
use App\Models\Carriage;
use App\Support\Interfaces\CarriageServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class CarriageController extends Controller {
    public function __construct(protected CarriageServiceInterface $carriageService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);

                return CarriageResource::collection($this->carriageService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('Carriage/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('Carriage/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriageRequest $request) {
        if ($this->ajax()) {
            return $this->carriageService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Carriage $carriage) {
        if ($this->ajax()) {
            return new CarriageResource($carriage);
        }

        return inertia('Carriage/Show', ['carriage' => new CarriageResource($carriage)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Carriage $carriage) {
        return inertia('Carriage/Edit', ['user' => new CarriageResource($carriage)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriageRequest $request, Carriage $carriage) {
        if ($this->ajax()) {
            return $this->carriageService->update($carriage, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Carriage $carriage) {
        if ($this->ajax()) {
            return $this->carriageService->delete($carriage);
        }
    }
}
