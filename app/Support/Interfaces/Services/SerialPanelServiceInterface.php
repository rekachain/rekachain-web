<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\SerialPanel;
use App\Models\User;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface SerialPanelServiceInterface extends BaseCrudServiceInterface {
    public function assignWorker(SerialPanel $serialPanel, array $data);
    public function rejectPanel($serialPanel, $request);
    public function exportAllQrCodes(): BinaryFileResponse;
}
