<?php

namespace App\Services;

use App\Exports\CustomAttachmentMaterial\CustomAttachmentMaterialsTemplateExport;
use App\Imports\CustomAttachmentMaterial\CustomAttachmentMaterialsImport;
use App\Models\PanelAttachment;
use App\Models\TrainsetAttachment;
use App\Support\Enums\PanelAttachmentHandlerHandlesEnum;
use App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum;
use App\Support\Interfaces\Repositories\CustomAttachmentMaterialRepositoryInterface;
use App\Support\Interfaces\Services\CustomAttachmentMaterialServiceInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CustomAttachmentMaterialService extends BaseCrudService implements CustomAttachmentMaterialServiceInterface {
    protected function getRepositoryClass(): string {
        return CustomAttachmentMaterialRepositoryInterface::class;
    }

    public function getImportDataTemplate(Model $attachment): BinaryFileResponse {
        if ($attachment instanceof PanelAttachment) {
            $prefix = $attachment->carriage_panel->panel->name .
                '-' . $attachment->carriage_panel->carriage_trainset->carriage->type .
                '-' . $attachment->carriage_panel->carriage_trainset->trainset->name .
                '-' . $attachment->carriage_panel->carriage_trainset->trainset->project->name;
        } else {
            $prefix = ucfirst($attachment->type->value) . '-' . $attachment->trainset->name . '-' . $attachment->trainset->project->name;
        }

        return (new CustomAttachmentMaterialsTemplateExport($attachment))->download($prefix . '-Raw Material Addition.xlsx');
    }

    public function addNewAttachment(Model $attachment, array $data): Model {
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
        $newTrainsetAttachment->update(['attachment_number' => $this->trainsetService()->generateAttachmentNumber($newTrainsetAttachment)]);
        $this->generateAttachmentQrCode($newTrainsetAttachment);

        return $newTrainsetAttachment;
    }

    private function generateAttachmentQrCode(Model $model) {
        if ($model instanceof TrainsetAttachment) {
            $qrCode = "KPM:{$model->attachment_number};P:{$model->trainset->project->name};TS:{$model->trainset->name};;";
            $path = "trainset_attachments/qr_images/{$model->id}.svg";
        } else {
            $serialPanelIds = $model->ancestor()->serial_panels()->pluck('id')->toArray();
            $serialPanelIdsString = implode(',', $serialPanelIds);
            $qrCode = "KPM:{$model->attachment_number};SN:[{$serialPanelIdsString}];P:{$model->trainset->project->name};TS:{$model->trainset->name};;";
            $path = "panel_attachments/qr_images/{$model->id}.svg";
        }
        $model->update(['qr_code' => $qrCode, 'qr_path' => $path]);
        $qrCode = QrCode::format('svg')->size(600)->generate($qrCode);
        Storage::put("public/{$path}", $qrCode);
    }

    public function importCustomAttachmentMaterial(Model $attachment, array $data): Model {
        if (array_key_exists('to_be_assigned', $data) && !$data['to_be_assigned']) {
            $newAttachment = $attachment;
        } else {
            $newAttachment = $this->addNewAttachment($attachment, $data);
        }
        $file = request()->file('file');
        Excel::import(new CustomAttachmentMaterialsImport($newAttachment, $data['override'] ?? null), $file);

        return $newAttachment;
    }
}
