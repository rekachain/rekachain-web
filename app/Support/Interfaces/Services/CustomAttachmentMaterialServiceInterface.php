<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface CustomAttachmentMaterialServiceInterface extends BaseCrudServiceInterface {
    public function getImportDataTemplate(Model $model): BinaryFileResponse;

    public function addNewAttachment(Model $attachment, array $data): Model;
}