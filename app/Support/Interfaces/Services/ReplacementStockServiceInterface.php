<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface ReplacementStockServiceInterface extends BaseCrudServiceInterface {
    public function getImportDataTemplate(): BinaryFileResponse;
}