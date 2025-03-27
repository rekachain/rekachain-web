<?php

namespace App\Services;

use App\Exports\ReplacementStock\ReplacementStocksTemplateExport;
use App\Imports\ReplacementStock\ReplacementStocksImport;
use App\Models\ReplacementStock;
use App\Support\Interfaces\Repositories\ReplacementStockRepositoryInterface;
use App\Support\Interfaces\Services\ReplacementStockServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ReplacementStockService extends BaseCrudService implements ReplacementStockServiceInterface {
    protected function getRepositoryClass(): string {
        return ReplacementStockRepositoryInterface::class;
    }

    public function importData(UploadedFile $file): bool {
        Excel::import(new ReplacementStocksImport, $file);

        return true;
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new ReplacementStocksTemplateExport)->download('replacement_stocks_template.xlsx');
    }

    public function updateStocks(array $data, bool $isIncrement = false): bool{
        $replacementStocks = ReplacementStock::whereIn('component_id', $data['component_ids'])->get();
        $replacementStocks->each(function (ReplacementStock $stock, int $key) use ($replacementStocks, $isIncrement) {
            $stock->update([
                'qty' => $isIncrement ? $replacementStocks[$key]->qty + 1 : $replacementStocks[$key]->qty - 1,
            ]);
        });
        return true;
    }
}
