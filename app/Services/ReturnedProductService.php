<?php

namespace App\Services;

use App\Imports\ReturnedProduct\ReturnedProductImport;
use App\Models\Component;
use App\Models\ReplacementStock;
use App\Models\ReturnedProduct;
use App\Support\Enums\ProductRestockStatusEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use App\Support\Interfaces\Repositories\ReturnedProductRepositoryInterface;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;
use App\Traits\Services\HandlesImages;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class ReturnedProductService extends BaseCrudService implements ReturnedProductServiceInterface {
    use HandlesImages;

    protected string $imagePath = 'returned_products/images';

    protected function getRepositoryClass(): string {
        return ReturnedProductRepositoryInterface::class;
    }

    public function create(array $data): ?Model {
        $data = $this->handleImageUpload($data);

        $returnedProduct = parent::create($data);

        return $returnedProduct;
    }

    public function update($keyOrModel, array $data): ?Model {
        $data = $this->handleImageUpload($data);

        return parent::update($keyOrModel, $data);
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->product_problems()->each(function ($productProblem) {
            $productProblem->product_problem_notes()->delete();
        });
        $keyOrModel->product_problems()->delete();
        $keyOrModel->returned_product_notes()->delete();

        return parent::delete($keyOrModel);
    }

    public function addProductProblem(ReturnedProduct $returnedProduct, array $data): bool {
        if ($data['component_id'] === null) {
            $component = Component::firstOrCreate([
                'name' => $data['new_component_name'],
                'description' => $data['new_component_description'],
            ]);
        } else {
            $component = $this->componentService()->findOrFail($data['component_id']);
        }
        $data = $this->handleImageUpload(data: $data, customPath: 'product_problems/images');
        $productProblem = $returnedProduct->product_problems()->create([
            'component_id' => $component->id,
            'status' => $data['status'],
            'image_path' => $data['image_path'] ?? null,
        ]);
        if (isset($data['note'])) {
            $productProblem->product_problem_notes()->create([
                'user_id' => auth()->id(),
                'note' => $data['note'],
            ]);
        }

        return true;
    }

    public function importData(UploadedFile $file): bool {
        Excel::import(new ReturnedProductImport, $file);

        return true;
    }

    public function importProductProblemData(ReturnedProduct $returnedProduct, UploadedFile $file): bool {
        Excel::import(new ReturnedProductImport($returnedProduct), $file);

        return true;
    }

    public function createWithReturnedProductNote(array $data): ?Model {
        $returnedProduct = $this->create($data);
        $returnedProduct->returned_product_notes()->create([
            'user_id' => auth()->id(),
            'note' => $data['note'],
        ]);

        return $returnedProduct;
    }

    public function updateReplacementStocks(ReturnedProduct $returnedProduct, array $data, bool $isIncrement = false): bool {
        $replacementStocks = $this->replacementStockService()->find([
            'component_id', 'in', $data['component_ids'],
        ]);
        $replacementStocks->each(function (ReplacementStock $stock, int $key) use ($returnedProduct, $replacementStocks, $isIncrement) {
            $this->replacementStockService()->update($stock, [
                'qty' => $isIncrement ? $replacementStocks[$key]->qty + 1 : $replacementStocks[$key]->qty - 1,
            ]);
            if ($stock->qty <= $stock->threshold) {
                $this->productRestockService()->create([
                    'returned_product_id' => $returnedProduct->id,
                    'product_restockable_id' => $returnedProduct->product_returnable_id,
                    'product_restockable_type' => $returnedProduct->product_returnable_type,
                    'status' => ProductRestockStatusEnum::REQUESTED->value,
                ]);
            }
        });
        if ($isIncrement) {
            if (isset($data['req_production']) && $data['req_production']) {
                $this->productRestockService()->create([
                    'returned_product_id' => $returnedProduct->id,
                    'product_restockable_id' => $returnedProduct->product_returnable_id,
                    'product_restockable_type' => $returnedProduct->product_returnable_type,
                    'status' => ProductRestockStatusEnum::REQUESTED->value,
                ]);
            }
            $returnedProduct->status = ReturnedProductStatusEnum::SCRAPPED;
            $returnedProduct->save();
        }

        return true;
    }
}
