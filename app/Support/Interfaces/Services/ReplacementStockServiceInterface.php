<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface ReplacementStockServiceInterface extends BaseCrudServiceInterface {
    public function importData(UploadedFile $file): bool;
    public function getImportDataTemplate(): BinaryFileResponse;
}