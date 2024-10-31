<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\CarriagePanel;
use Illuminate\Http\UploadedFile;

interface CarriagePanelServiceInterface extends BaseCrudServiceInterface {
    public function importProgressMaterialData(UploadedFile $file, CarriagePanel $carriagePanel): bool;
}
