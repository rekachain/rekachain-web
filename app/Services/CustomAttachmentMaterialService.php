<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Exports\CustomAttachmentMaterial\CustomAttachmentMaterialsTemplateExport;
use App\Models\PanelAttachment;
use App\Models\TrainsetAttachment;
use App\Support\Enums\PanelAttachmentHandlerHandlesEnum;
use App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum;
use App\Support\Interfaces\Repositories\CustomAttachmentMaterialRepositoryInterface;
use App\Support\Interfaces\Services\CustomAttachmentMaterialServiceInterface;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CustomAttachmentMaterialService extends BaseCrudService implements CustomAttachmentMaterialServiceInterface {
    public function __construct(
        protected TrainsetServiceInterface $trainsetService
    ) {}

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
    
    public function addNewAttachment(Model $attachment, array $data): Model{
        if ($attachment instanceof PanelAttachment) {
            $newTrainsetAttachment = $attachment->childs()->create([
                'carriage_panel_id' => $attachment->carriage_panel_id,
                'source_workstation_id' => $data['source_workstation_id'] ?? $attachment->source_workstation_id,
                'destination_workstation_id' => $data['destination_workstation_id'] ?? $attachment->destination_workstation_id,
            ]);
            $newTrainsetAttachment->panel_attachment_handlers()->create([
                'user_id' => auth()->user()->id,
                'handler_name' => auth()->user()->name,
                'handles' => PanelAttachmentHandlerHandlesEnum::PREPARE->value,
            ]);
        } else {
            $newTrainsetAttachment = $attachment->childs()->create([
                'trainset_id' => $attachment->trainset->id,
                'source_workstation_id' => $data['source_workstation_id'] ?? $attachment->source_workstation_id,
                'destination_workstation_id' => $data['destination_workstation_id'] ?? $attachment->destination_workstation_id,
                'type' => $attachment->type,
            ]);
            $newTrainsetAttachment->trainset_attachment_handlers()->create([
                'user_id' => auth()->user()->id,
                'handler_name' => auth()->user()->name,
                'handles' => TrainsetAttachmentHandlerHandlesEnum::PREPARE->value,
            ]);
        }
        $newTrainsetAttachment->update(['attachment_number' => $this->trainsetService->generateAttachmentNumber($newTrainsetAttachment)]);
        $this->generateAttachmentQrCode($newTrainsetAttachment);
        return $newTrainsetAttachment;
    }

    private function generateAttachmentQrCode(Model $model) {
        if ($model instanceof TrainsetAttachment) {
            $qrCode = "KPM:{$model->attachment_number};P:{$model->trainset->project->name};TS:{$model->trainset->name};;";
            $path = "trainset_attachments/qr_images/{$model->id}.svg";
        } else {
            $serialPanelIds = $model->serial_panels()->pluck('id')->toArray();
            $serialPanelIdsString = implode(',', $serialPanelIds);
            $qrCode = "KPM:{$model->attachment_number};SN:[{$serialPanelIdsString}];P:{$model->trainset->project->name};TS:{$model->trainset->name};;";
            $path = "panel_attachments/qr_images/{$model->id}.svg";
        }
        $model->update(['qr_code' => $qrCode, 'qr_path' => $path]);
        $qrCode = QrCode::format('svg')->size(600)->generate($qrCode);
        Storage::put("public/{$path}", $qrCode);
    }
}