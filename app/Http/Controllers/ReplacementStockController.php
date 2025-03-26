<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReplacementStock\StoreReplacementStockRequest;
use App\Http\Requests\ReplacementStock\UpdateReplacementStockRequest;
use App\Http\Resources\ReplacementStockResource;
use App\Models\ReplacementStock;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\ReplacementStockServiceInterface;
use Illuminate\Http\Request;

class ReplacementStockController extends Controller {
    public function __construct(protected ReplacementStockServiceInterface $replacementStockService) {}

    public function index(Request $request) {

        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_REPLACEMENT_STOCK_GET_TEMPLATE_IMPORT_REPLACEMENT_STOCK->value:
                    return $this->replacementStockService->getImportDataTemplate();
            }

            $perPage = $request->get('perPage', 10);
            $data = ReplacementStockResource::collection($this->replacementStockService->getAllPaginated($request->query(), $perPage));

            return $data;
        }

        return inertia('ReplacementStock/Index');
    }

    public function create() {
        return inertia('ReplacementStock/Create');
    }

    public function store(StoreReplacementStockRequest $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_REPLACEMENT_STOCK_IMPORT_REPLACEMENT_STOCK->value:
                    $this->replacementStockService->importData($request->file('import_file'));

                    return response()->noContent();
            }

            return $this->replacementStockService->create($request->validated());
        }
    }

    public function show(ReplacementStock $replacementStock) {
        $data = ReplacementStockResource::make($replacementStock);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ReplacementStock/Show', compact('data'));
    }

    public function edit(ReplacementStock $replacementStock) {
        $data = ReplacementStockResource::make($replacementStock);

        return inertia('ReplacementStock/Edit', compact('data'));
    }

    public function update(UpdateReplacementStockRequest $request, ReplacementStock $replacementStock) {
        if ($this->ajax()) {
            return $this->replacementStockService->update($replacementStock, $request->validated());
        }
    }

    public function destroy(ReplacementStock $replacementStock) {
        if ($this->ajax()) {
            return $this->replacementStockService->delete($replacementStock);
        }
    }
}
