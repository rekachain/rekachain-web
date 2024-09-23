<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface PanelAttachmentServiceInterface extends BaseCrudServiceInterface {
    public function filterStatus(array $query, array $statuses);
}