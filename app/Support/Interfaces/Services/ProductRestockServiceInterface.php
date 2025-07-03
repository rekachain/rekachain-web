<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface ProductRestockServiceInterface extends BaseCrudServiceInterface {
    public function initiateRestockProject(array $data): bool;
}
