<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ProductProblemNoteRepositoryInterface;
use App\Support\Interfaces\Services\ProductProblemNoteServiceInterface;
use Illuminate\Database\Eloquent\Model;

class ProductProblemNoteService extends BaseCrudService implements ProductProblemNoteServiceInterface {
    protected function getRepositoryClass(): string {
        return ProductProblemNoteRepositoryInterface::class;
    }

    public function create(array $data): Model {
        if (!isset($data['user_id'])) {
            $data['user_id'] = auth()->id();
        }
        $model = $this->repository->create($data);
        return $model;
    }
}