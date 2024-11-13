<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Exports\CustomAttachmentMaterial\CustomAttachmentMaterialsTemplateExport;
use App\Models\PanelAttachment;
use App\Support\Interfaces\Repositories\CustomAttachmentMaterialRepositoryInterface;
use App\Support\Interfaces\Services\CustomAttachmentMaterialServiceInterface;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CustomAttachmentMaterialService extends BaseCrudService implements CustomAttachmentMaterialServiceInterface {
    protected function getRepositoryClass(): string {
        return CustomAttachmentMaterialRepositoryInterface::class;
    }

    public function getImportDataTemplate(Model $model): BinaryFileResponse{
        if ($model instanceof PanelAttachment) {
            $prefix = $model->carriage_panel->panel->name . 
                '-' . $model->carriage_panel->carriage_trainset->carriage->type . 
                '-' . $model->carriage_panel->carriage_trainset->trainset->name . 
                '-' . $model->carriage_panel->carriage_trainset->trainset->project->name;
        } else {
            $prefix = $model->type . '-' . $model->trainset->name . '-' . $model->trainset->project->name;
        }
        return (new CustomAttachmentMaterialsTemplateExport($model))->download($prefix . '-Raw Material Addition.xlsx');
    }
}