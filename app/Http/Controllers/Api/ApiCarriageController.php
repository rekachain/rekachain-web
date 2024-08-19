<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Carriage\StoreCarriageRequest;
use App\Http\Requests\Carriage\UpdateCarriageRequest;
use App\Http\Resources\CarriageResource;
use App\Models\Carriage;
use App\Support\Interfaces\CarriageServiceInterface;
use Illuminate\Http\Request;

class ApiCarriageController extends Controller {
    public function __construct(
        protected CarriageServiceInterface $carriageService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 15);

        return CarriageResource::collection(
            $this->carriageService->getAllPaginated($request->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriageRequest $request) {
        return $this->carriageService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Carriage $carriage) {
        return new CarriageResource($carriage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriageRequest $request, Carriage $carriage) {
        return $this->carriageService->update($carriage, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
