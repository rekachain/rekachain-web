<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\CustomAttachmentMaterial;
use App\Models\PanelAttachment;

interface PanelAttachmentServiceInterface extends BaseCrudServiceInterface {
    public function assignCustomAttachmentMaterial(PanelAttachment $panelAttachment, array $data): CustomAttachmentMaterial;

    public function confirmKPM(PanelAttachment $panelAttachment, $request);

    public function rejectKPM($panelAttachment, $request);

    public function assignSpvAndReceiver(PanelAttachment $panelAttachment, array $data);

    public function assignHandler(PanelAttachment $panelAttachment, array $data);

    public function checkProgressAttachment(PanelAttachment $panelAttachment);
}
