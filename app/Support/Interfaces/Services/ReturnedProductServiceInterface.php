<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\ReturnedProduct;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

interface ReturnedProductServiceInterface extends BaseCrudServiceInterface {
    public function addProductProblem(ReturnedProduct $returnedProduct, array $data): bool;

    public function importData(UploadedFile $file): bool;

    public function importProductProblemData(ReturnedProduct $returnedProduct, UploadedFile $file): bool;

    public function createWithReturnedProductNote(array $data): ?Model;

    public function updateReplacementStocks(ReturnedProduct $returnedProduct, array $data, bool $isIncrement = false): bool;
}
