<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Imports\PanelsImport;
use App\Support\Interfaces\Repositories\PanelRepositoryInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class PanelService extends BaseCrudService implements PanelServiceInterface {
    public function importPanels(UploadedFile $file): bool {
        Excel::import(new PanelsImport, $file);
        return true;
    }

    protected function getRepositoryClass(): string {
        return PanelRepositoryInterface::class;
    }
}
