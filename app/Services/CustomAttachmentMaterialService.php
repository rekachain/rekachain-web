<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\CustomAttachmentMaterialRepositoryInterface;
use App\Support\Interfaces\Services\CustomAttachmentMaterialServiceInterface;

class CustomAttachmentMaterialService extends BaseCrudService implements CustomAttachmentMaterialServiceInterface {
    protected function getRepositoryClass(): string {
        return CustomAttachmentMaterialRepositoryInterface::class;
    }
}