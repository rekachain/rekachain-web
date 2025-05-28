<?php

namespace App\Services;

use App\Http\Resources\ReturnedProductResource;
use App\Jobs\ReturnedProduct\ReturnedProductImportJob;
use App\Models\Component;
use App\Models\Panel;
use App\Models\ReplacementStock;
use App\Models\ReturnedProduct;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\ProductProblemStatusEnum;
use App\Support\Enums\ProductRestockStatusEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use App\Support\Interfaces\Repositories\ReturnedProductRepositoryInterface;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;
use App\Traits\Services\HandlesImages;
use File;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class ReturnedProductService extends BaseCrudService implements ReturnedProductServiceInterface {
    use HandlesImages;

    protected string $imagePath = 'returned_products/images';

    protected function getRepositoryClass(): string {
        return ReturnedProductRepositoryInterface::class;
    }

    public function create(array $data): ?Model {
        $data = $this->handleImageUpload($data);

        if (!isset($data['product_returnable_id']) && isset($data['serial_panel_id']) && $data['serial_panel_id'] !== null) {
            $serialPanel = $this->serialPanelService()->findOrFail($data['serial_panel_id']);
            $data['product_returnable_id'] = $serialPanel->panel_attachment->carriage_panel->panel_id;
            $data['product_returnable_type'] = Panel::class;
            $data['project_name'] = $serialPanel->project->name;
            $data['trainset_name'] = $serialPanel->trainset->name;
            $data['carriage_type'] = $serialPanel->carriage->type;
        }

        $returnedProduct = parent::create($data);

        return $returnedProduct;
    }

    public function update($keyOrModel, array $data): ?Model {
        $data = $this->handleImageUpload($data);

        if (isset($data['status']) && $data['status'] == ReturnedProductStatusEnum::SCRAPPED->value && $keyOrModel->product_returnable_type === Panel::class) {
            $returnedProductComponents = ReturnedProductResource::make($keyOrModel)->toArray(request()->merge(['intent' => IntentEnum::WEB_RETURNED_PRODUCT_GET_RETURNED_PRODUCT_COMPONENTS->value]));
            $returnedProductComponentIds = array_column($returnedProductComponents, 'id');
            $problemComponentIds = $keyOrModel->product_problems()->pluck('component_id')->toArray();
            $scrappedComponentIds = array_diff($returnedProductComponentIds, $problemComponentIds);

            $this->updateReplacementStocks($keyOrModel, [
                'component_ids' => $scrappedComponentIds,
            ], true);
        }

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
                'applied_status' => $data['status'],
            ]);
        }

        return true;
    }

    private function handleImportFile(UploadedFile $file): string {
        $tempDirectory = storage_path('app/temp/laravel-excel-import');
        if (File::exists($tempDirectory)) {
            File::cleanDirectory($tempDirectory);
        } else {
            File::makeDirectory($tempDirectory, 0755, true); // Create if it doesn't exist
        }
        $tempFilePath = $file->store('temp/laravel-excel-import');

        return $tempFilePath;
    }

    public function importData(UploadedFile $file): bool {
        $userId = auth()->id();
        $filePath = $this->handleImportFile($file);
        ReturnedProductImportJob::dispatch($filePath, $userId);

        return true;
    }

    public function importProductProblemData(ReturnedProduct $returnedProduct, UploadedFile $file): bool {
        $userId = auth()->id();
        $filePath = $this->handleImportFile($file);
        ReturnedProductImportJob::dispatch($filePath, $userId, $returnedProduct);

        return true;
    }

    public function createReturnedProductRequest(array $data): ?Model {
        $data['status'] = ReturnedProductStatusEnum::REQUESTED->value;
        $data['buyer_id'] = auth()->id();
        $returnedProduct = $this->create($data);

        return $returnedProduct;
    }

    public function createWithReturnedProductNote(array $data): ?Model {
        $returnedProduct = $this->create($data);
        $returnedProduct->returned_product_notes()->create([
            'user_id' => auth()->id(),
            'note' => $data['note'],
            'applied_status' => $data['status'],
        ]);

        return $returnedProduct;
    }

    public function updateWithNote(ReturnedProduct $returnedProduct, array $data): ?Model {
        $returnedProduct = $this->update($returnedProduct, $data);
        $returnedProduct->returned_product_notes()->create([
            'user_id' => auth()->id(),
            'note' => $data['note'],
            'applied_status' => $data['status'] ?? $returnedProduct->status,
        ]);

        return $returnedProduct;
    }

    public function updateReplacementStocks(ReturnedProduct $returnedProduct, array $data, bool $isIncrement = false): bool
    {
        DB::beginTransaction();
        try {
            $replacementStocks = $this->replacementStockService()->find([
                'component_id',
                'in',
                $data['component_ids'],
            ]);
            $diff = array_diff($data['component_ids'], $replacementStocks->pluck('component_id')->toArray());
            if (count($diff) > 0) {
                foreach ($diff as $componentId) {
                    $this->replacementStockService()->create([
                        'component_id' => $componentId,
                        'qty' => 0,
                    ]);
                }
            }
            $replacementStocks = $this->replacementStockService()->find([
                'component_id',
                'in',
                $data['component_ids'],
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
            } else {
                foreach ($data['component_ids'] as $value) {
                    $productProblem = $this->productProblemService()->find([
                        'component_id' => $value,
                        'returned_product_id' => $returnedProduct->id,
                    ])->first();
                    $this->productProblemService()->update($productProblem, [
                        'status' => ProductProblemStatusEnum::CHANGED->value,
                    ]);
                }
            }
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
