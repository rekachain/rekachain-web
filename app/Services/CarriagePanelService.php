<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Imports\CarriagePanel\CarriagePanelProgressMaterialImport;
use App\Models\CarriagePanel;
use App\Support\Interfaces\Repositories\CarriagePanelRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use App\Support\Interfaces\Services\PanelMaterialServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class CarriagePanelService extends BaseCrudService implements CarriagePanelServiceInterface {
    public function __construct(
        protected CarriagePanelComponentServiceInterface $carriagePanelComponentService,
        protected PanelMaterialServiceInterface $panelMaterialService,
        protected PanelAttachmentServiceInterface $panelAttachmentService,
    ) {
        parent::__construct();
    }

    protected function getRepositoryClass(): string {
        return CarriagePanelRepositoryInterface::class;
    }
    
    public function importProgressMaterialData(UploadedFile $file, CarriagePanel $carriagePanel): bool {
        Excel::import(new CarriagePanelProgressMaterialImport($carriagePanel), $file);

        return true;
    }

    /**
     * @param  int|CarriagePanel  $keyOrModel
     *
     * @throws \Exception
     */
    public function delete($keyOrModel): bool {
        $keyOrModel->panel_attachments()->each(function ($attachment) {
            $this->panelAttachmentService->delete($attachment);
        });
        $keyOrModel->carriage_panel_components()->each(function ($component) {
            $this->carriagePanelComponentService->delete($component);
        });

        $keyOrModel->panel_materials()->each(function ($material) {
            $this->panelMaterialService->delete($material);
        });

        // TODO: update trainset_preset_id to null

        return parent::delete($keyOrModel);
    }
}
