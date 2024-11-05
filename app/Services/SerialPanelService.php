<?php

namespace App\Services;

use ZipArchive;
use App\Models\SerialPanel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Support\Interfaces\Repositories\UserRepositoryInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use App\Support\Interfaces\Repositories\SerialPanelRepositoryInterface;
use App\Support\Interfaces\Repositories\ProgressStepRepositoryInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Services\UserServiceInterface;

class SerialPanelService extends BaseCrudService implements SerialPanelServiceInterface {
    public function __construct(
        protected DetailWorkerPanelRepositoryInterface $detailWorkerPanelRepository,
        protected ProgressStepRepositoryInterface $progressStepRepository,
        protected UserServiceInterface $userService,
        protected UserRepositoryInterface $userRepository,
        protected DetailWorkerPanelServiceInterface $detailWorkerPanelService
    ) {
        parent::__construct();
    }

    public function assignWorker(SerialPanel $serialPanel, array $data){
        $userId = $data['worker_id'] ?? auth()->user()->id;
        $user = $this->userService->find(['id' => $userId])->first();
        $workerPanel = $this->detailWorkerPanelRepository->findFirst(['serial_panel_id' => $serialPanel->id, 'worker_id' => $user->id]);
        if ($workerPanel) {
            return $workerPanel;
        }
        return $this->detailWorkerPanelService->create([
            'serial_panel_id' => $serialPanel->id,
            'worker_id' => $user->id,
            'progress_step_id' => $this->progressStepRepository->findFirst(['progress_id' => $serialPanel->panel_attachment->carriage_panel->progress_id, 'step_id' => $user->step->id])->id,
            'estimated_time' => $user->step->estimated_time
        ]);
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->detail_worker_panels()->each(function ($detailWorkerPanel) {
            $this->detailWorkerPanelService->delete($detailWorkerPanel);
        });

        return parent::delete($keyOrModel);
    }

    public function rejectPanel($serialPanel, $request){
        $data = SerialPanel::find($serialPanel->id);

        $data->manufacture_status = SerialPanelManufactureStatusEnum::FAILED->value;
        $data->notes = $request->notes;
        $data->save();

        return $serialPanel;
    }

    public function exportAllQrCodes(): BinaryFileResponse {
        $zip = new ZipArchive;
        $fileName = 'qr_codes.zip';
        $zip->open(storage_path('app/public/' . $fileName), ZipArchive::CREATE);

        $serialPanels = $this->getAll();

        foreach ($serialPanels as $serialPanel) {
            // Generate QR code image
            $qrCode = QrCode::format('png')->size(200)->generate($serialPanel->qr_code);
            $qrPath = storage_path('app/public/qr-' . $serialPanel->id . '.png');
            file_put_contents($qrPath, $qrCode);

            // Add QR code image to zip archive
            $zip->addFile($qrPath, 'qr-' . $serialPanel->id . '.png');
        }

        $zip->close();

        // Clean up temporary files
        foreach ($serialPanels as $serialPanel) {
            unlink(storage_path('app/pubblic/qr-' . $serialPanel->id . '.png'));
        }

        return response()->download(storage_path('app/public/' . $fileName))->deleteFileAfterSend();
    }

    protected function getRepositoryClass(): string {
        return SerialPanelRepositoryInterface::class;
    }
}
