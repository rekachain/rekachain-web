<?php

namespace App\Support\Interfaces\Services;

use App\Models\PanelAttachment;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface PanelAttachmentServiceInterface extends BaseCrudServiceInterface
{
    public function confirmKPM(PanelAttachment $panelAttachment, $request);
}