<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface SerialPanelServiceInterface extends BaseCrudServiceInterface {
    public function rejectPanel($serialPanel, $request);
}