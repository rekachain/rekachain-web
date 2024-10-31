<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\CarriagePanelComponent;
use Illuminate\Http\UploadedFile;

interface CarriagePanelComponentServiceInterface extends BaseCrudServiceInterface {
    public function importProgressMaterialData(UploadedFile $file, CarriagePanelComponent $carriagePanelComponent, int $workAspectId): bool;
}
