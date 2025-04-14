<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRestock\StoreProductRestockRequest;
use App\Http\Requests\ProductRestock\UpdateProductRestockRequest;
use App\Http\Resources\ProductRestockResource;
use App\Models\ProductRestock;
use App\Support\Interfaces\Services\ProductRestockServiceInterface;
use Illuminate\Http\Request;

class ProductRestockController extends Controller {
    public function __construct(protected ProductRestockServiceInterface $productRestockService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);

        if ($this->ajax()) {
            return ProductRestockResource::collection($this->productRestockService->with(['product_restockable'])->getAllPaginated($request->query(), $perPage));
        }

        return inertia('ReturnedProduct/Index');
    }
}