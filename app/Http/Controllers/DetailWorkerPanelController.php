<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetailWorkerPanel\StoreDetailWorkerPanelRequest;
use App\Http\Requests\DetailWorkerPanel\UpdateDetailWorkerPanelRequest;
use App\Http\Resources\DetailWorkerPanelResource;
use App\Models\DetailWorkerPanel;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use Illuminate\Http\Request;

class DetailWorkerPanelController extends Controller {
    public function __construct(protected DetailWorkerPanelServiceInterface $detailworkerpanelService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = DetailWorkerPanelResource::collection($this->detailworkerpanelService->getAllPaginated($request->query(), $perPage));

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
            return $this->detailworkerpanelService->create($request->validated());
        }
    }

    public function show(DetailWorkerPanel $detailworkerpanel) {
        $data = DetailWorkerPanelResource::make($detailworkerpanel);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('DetailWorkerPanel/Show', compact('data'));
    }

    public function edit(DetailWorkerPanel $detailworkerpanel) {
        $data = DetailWorkerPanelResource::make($detailworkerpanel);

        return inertia('DetailWorkerPanel/Edit', compact('data'));
    }

    public function update(UpdateDetailWorkerPanelRequest $request, DetailWorkerPanel $detailworkerpanel) {
        if ($this->ajax()) {
            return $this->detailworkerpanelService->update($detailworkerpanel, $request->validated());
        }
    }

    public function destroy(DetailWorkerPanel $detailworkerpanel) {
        if ($this->ajax()) {
            return $this->detailworkerpanelService->delete($detailworkerpanel);
        }
    }
}