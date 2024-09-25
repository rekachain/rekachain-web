<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetailWorkerTrainset\StoreDetailWorkerTrainsetRequest;
use App\Http\Requests\DetailWorkerTrainset\UpdateDetailWorkerTrainsetRequest;
use App\Http\Resources\DetailWorkerTrainsetResource;
use App\Models\DetailWorkerTrainset;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use Illuminate\Http\Request;

class DetailWorkerTrainsetController extends Controller {
    public function __construct(protected DetailWorkerTrainsetServiceInterface $detailworkertrainsetService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = DetailWorkerTrainsetResource::collection($this->detailworkertrainsetService->getAllPaginated($request->query(), $perPage));

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
            return $this->detailworkertrainsetService->create($request->validated());
        }
    }

    public function show(DetailWorkerTrainset $detailworkertrainset) {
        $data = DetailWorkerTrainsetResource::make($detailworkertrainset);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('DetailWorkerTrainset/Show', compact('data'));
    }

    public function edit(DetailWorkerTrainset $detailworkertrainset) {
        $data = DetailWorkerTrainsetResource::make($detailworkertrainset);

        return inertia('DetailWorkerTrainset/Edit', compact('data'));
    }

    public function update(UpdateDetailWorkerTrainsetRequest $request, DetailWorkerTrainset $detailworkertrainset) {
        if ($this->ajax()) {
            return $this->detailworkertrainsetService->update($detailworkertrainset, $request->validated());
        }
    }

    public function destroy(DetailWorkerTrainset $detailworkertrainset) {
        if ($this->ajax()) {
            return $this->detailworkertrainsetService->delete($detailworkertrainset);
        }
    }
}