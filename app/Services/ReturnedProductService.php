<?php

namespace App\Services;

use App\Imports\ReturnedProduct\ReturnedProductImport;
use App\Models\ReturnedProduct;
use App\Support\Interfaces\Repositories\ReturnedProductRepositoryInterface;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class ReturnedProductService extends BaseCrudService implements ReturnedProductServiceInterface {
    protected function getRepositoryClass(): string {
        return ReturnedProductRepositoryInterface::class;
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->product_problems()->delete();

        return parent::delete($keyOrModel);
    }

    public function importData(UploadedFile $file): bool {
        Excel::import(new ReturnedProductImport, $file);

        return true;
    }

    public function importProductProblemData(ReturnedProduct $returnedProduct, UploadedFile $file): bool {
        Excel::import(new ReturnedProductImport($returnedProduct), $file);

        return true;
    }
}