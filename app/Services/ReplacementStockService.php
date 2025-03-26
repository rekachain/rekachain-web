<?php

namespace App\Services;

use App\Exports\ReplacementStock\ReplacementStocksTemplateExport;
use App\Imports\ReplacementStock\ReplacementStocksImport;
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
}
