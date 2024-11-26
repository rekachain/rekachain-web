<?php

namespace App\Http\Controllers;

use App\Http\Requests\FailedComponentManufacture\StoreFailedComponentManufactureRequest;
use App\Http\Requests\FailedComponentManufacture\UpdateFailedComponentManufactureRequest;
use App\Http\Resources\FailedComponentManufactureResource;
use App\Models\FailedComponentManufacture;
use App\Support\Interfaces\Services\FailedComponentManufactureServiceInterface;
use Illuminate\Http\Request;

class FailedComponentManufactureController extends Controller {
    public function __construct(protected FailedComponentManufactureServiceInterface $failedComponentManufactureService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = FailedComponentManufactureResource::collection($this->failedComponentManufactureService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('FailedComponentManufacture/Index');
    }

    public function create() {
        return inertia('FailedComponentManufacture/Create');
    }

    public function store(StoreFailedComponentManufactureRequest $request) {
        if ($this->ajax()) {
            return $this->failedComponentManufactureService->create($request->validated());
        }
    }

    public function show(FailedComponentManufacture $failedComponentManufacture) {
        $data = FailedComponentManufactureResource::make($failedComponentManufacture);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('FailedComponentManufacture/Show', compact('data'));
    }

    public function edit(FailedComponentManufacture $failedComponentManufacture) {
        $data = FailedComponentManufactureResource::make($failedComponentManufacture);

        return inertia('FailedComponentManufacture/Edit', compact('data'));
    }

    public function update(UpdateFailedComponentManufactureRequest $request, FailedComponentManufacture $failedComponentManufacture) {
        if ($this->ajax()) {
            return $this->failedComponentManufactureService->update($failedComponentManufacture, $request->validated());
        }
    }

    public function destroy(FailedComponentManufacture $failedComponentManufacture) {
        if ($this->ajax()) {
            return $this->failedComponentManufactureService->delete($failedComponentManufacture);
        }
    }
}
