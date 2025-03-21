<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Database\Eloquent\Model;

interface ProductProblemServiceInterface extends BaseCrudServiceInterface {
    public function updateWithNote($keyOrModel, array $data): ?Model;
}
