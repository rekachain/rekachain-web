<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetailWorkerTrainset\StoreDetailWorkerTrainsetRequest;
use App\Http\Requests\DetailWorkerTrainset\UpdateDetailWorkerTrainsetRequest;
use App\Http\Resources\DetailWorkerTrainsetResource;
use App\Models\DetailWorkerTrainset;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use Illuminate\Http\Request;

class DetailWorkerTrainsetController extends Controller {
    public function __construct(protected DetailWorkerTrainsetServiceInterface $detailWorkerTrainsetService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = DetailWorkerTrainsetResource::collection($this->detailWorkerTrainsetService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('DetailWorkerTrainset/Index');
    }

    public function create() {
        return inertia('DetailWorkerTrainset/Create');
    }

    public function store(StoreDetailWorkerTrainsetRequest $request) {
        if ($this->ajax()) {
            return $this->detailWorkerTrainsetService->create($request->validated());
        }
    }

    public function show(DetailWorkerTrainset $detail_worker_trainset) {
        $data = DetailWorkerTrainsetResource::make($detail_worker_trainset);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('DetailWorkerTrainset/Show', compact('data'));
    }

    public function edit(DetailWorkerTrainset $detailWorkerTrainset) {
        $data = DetailWorkerTrainsetResource::make($detailWorkerTrainset);

        return inertia('DetailWorkerTrainset/Edit', compact('data'));
    }

    public function update(UpdateDetailWorkerTrainsetRequest $request, DetailWorkerTrainset $detailWorkerTrainset) {
        if ($this->ajax()) {
            return $this->detailWorkerTrainsetService->update($detailWorkerTrainset, $request->validated());
        }
    }

    public function destroy(DetailWorkerTrainset $detailWorkerTrainset) {
        if ($this->ajax()) {
            return $this->detailWorkerTrainsetService->delete($detailWorkerTrainset);
        }
    }
}
