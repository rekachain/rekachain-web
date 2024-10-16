<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\PanelAttachment;

interface PanelAttachmentServiceInterface extends BaseCrudServiceInterface
{
    public function confirmKPM($panelAttachment);
    public function rejectKPM($panelAttachment, $request);
    public function assignSpvAndReceiver(PanelAttachment $panelAttachment, array $data);
}
