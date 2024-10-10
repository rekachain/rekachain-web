<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\SerialPanel;
use App\Models\User;

interface SerialPanelServiceInterface extends BaseCrudServiceInterface {
    public function assignWorker(SerialPanel $serialPanel, User $user);
    public function rejectPanel($serialPanel, $request);
}