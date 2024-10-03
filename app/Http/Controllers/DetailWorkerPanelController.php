<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetailWorkerPanel\StoreDetailWorkerPanelRequest;
use App\Http\Requests\DetailWorkerPanel\UpdateDetailWorkerPanelRequest;
use App\Http\Resources\DetailWorkerPanelResource;
use App\Models\DetailWorkerPanel;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use Illuminate\Http\Request;

class DetailWorkerPanelController extends Controller {
    public function __construct(protected DetailWorkerPanelServiceInterface $detailWorkerPanelService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = DetailWorkerPanelResource::collection($this->detailWorkerPanelService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('DetailWorkerPanel/Index');
    }

    public function create() {
        return inertia('DetailWorkerPanel/Create');
    }

    public function store(StoreDetailWorkerPanelRequest $request) {
        if ($this->ajax()) {
            return $this->detailWorkerPanelService->create($request->validated());
        }
    }

    public function show(DetailWorkerPanel $detailWorkerPanel) {
        $data = DetailWorkerPanelResource::make($detailWorkerPanel);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('DetailWorkerPanel/Show', compact('data'));
    }

    public function edit(DetailWorkerPanel $detailWorkerPanel) {
        $data = DetailWorkerPanelResource::make($detailWorkerPanel);

        return inertia('DetailWorkerPanel/Edit', compact('data'));
    }

    public function update(UpdateDetailWorkerPanelRequest $request, DetailWorkerPanel $detailWorkerPanel) {
        if ($this->ajax()) {
            return $this->detailWorkerPanelService->update($detailWorkerPanel, $request->validated());
        }
    }

    public function destroy(DetailWorkerPanel $detailWorkerPanel) {
        if ($this->ajax()) {
            return $this->detailWorkerPanelService->delete($detailWorkerPanel);
        }
    }
}
