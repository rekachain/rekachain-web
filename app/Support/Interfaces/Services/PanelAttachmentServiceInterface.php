<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface PanelAttachmentServiceInterface extends BaseCrudServiceInterface
{
    public function confirmKPM($panelAttachment);
    public function rejectKPM($panelAttachment, $request);
}
