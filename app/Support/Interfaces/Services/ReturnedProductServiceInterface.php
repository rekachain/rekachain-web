<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\ReturnedProduct;
use Illuminate\Http\UploadedFile;

interface ReturnedProductServiceInterface extends BaseCrudServiceInterface {
    public function importData(UploadedFile $file): bool;
    public function importProductProblemData(ReturnedProduct $returnedProduct, UploadedFile $file): bool;
}