<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Http\UploadedFile;

interface PanelServiceInterface extends BaseCrudServiceInterface {
    public function importPanels(UploadedFile $file): bool;
}
