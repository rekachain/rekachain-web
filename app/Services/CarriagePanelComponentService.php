<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Imports\CarriagePanelComponent\CarriagePanelComponentProgressMaterialImport;
use App\Models\CarriagePanelComponent;
use App\Support\Interfaces\Repositories\CarriagePanelComponentRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class CarriagePanelComponentService extends BaseCrudService implements CarriagePanelComponentServiceInterface {
    protected function getRepositoryClass(): string {
        return CarriagePanelComponentRepositoryInterface::class;
    }

    public function importProgressMaterialData(UploadedFile $file, CarriagePanelComponent $carriagePanelComponent, int $workAspectId): bool {
        Excel::import(new CarriagePanelComponentProgressMaterialImport($carriagePanelComponent, $workAspectId), $file);

        return true;
    }
}
