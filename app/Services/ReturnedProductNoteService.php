<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ReturnedProductNoteRepositoryInterface;
use App\Support\Interfaces\Services\ReturnedProductNoteServiceInterface;
use Illuminate\Database\Eloquent\Model;

class ReturnedProductNoteService extends BaseCrudService implements ReturnedProductNoteServiceInterface {
    protected function getRepositoryClass(): string {
        return ReturnedProductNoteRepositoryInterface::class;
    }

    public function create(array $data): Model {
        if (!isset($data['user_id'])) {
            $data['user_id'] = auth()->id();
        }
        $model = parent::create($data);

        return $model;
    }
}
