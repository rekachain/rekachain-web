<?php

namespace App\Services;

use App\Exports\ReplacementStock\ReplacementStocksTemplateExport;
use App\Support\Interfaces\Repositories\ReplacementStockRepositoryInterface;
use App\Support\Interfaces\Services\ReplacementStockServiceInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ReplacementStockService extends BaseCrudService implements ReplacementStockServiceInterface {
    protected function getRepositoryClass(): string {
        return ReplacementStockRepositoryInterface::class;
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new ReplacementStocksTemplateExport)->download('replacement_stocks_template.xlsx');
    }
}