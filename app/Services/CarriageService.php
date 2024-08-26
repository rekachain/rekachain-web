<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\Carriage;
use App\Support\Interfaces\Repositories\CarriageRepositoryInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use App\Support\Interfaces\Services\CarriageServiceInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;
use Illuminate\Support\Facades\DB;

class CarriageService extends BaseCrudService implements CarriageServiceInterface {
    public function __construct(protected CarriagePanelServiceInterface $carriagePanelService, protected PanelServiceInterface $panelService) {
        parent::__construct();
    }

    protected function getRepositoryClass(): string {
        return CarriageRepositoryInterface::class;
    }

    public function addPanel(Carriage $carriage, array $data): bool {
        return DB::transaction(function () use ($carriage, $data) {
            $panelId = $data['panel_id'];
            $progressId = $data['carriage_panel_progress_id'];
            $panelName = $data['panel_name'];
            $panelDescription = $data['panel_description'];
            $carriagePanelQty = $data['carriage_panel_qty'];

            if ($panelId) {
                $panel = $this->panelService->findOrFail($panelId);
            } else {
                $panel = $this->panelService->create([
                    'name' => $panelName,
                    'description' => $panelDescription,
                ]);
            }

            $carriage->carriage_panels()->create([
                'panel_id' => $panel->id,
                'progress_id' => $progressId,
                'qty' => $carriagePanelQty,
            ]);

            $carriage->carriage_trainsets()->each(function ($carriageTrainset) {
                $carriageTrainset->trainset()->update(['preset_trainset_id' => null]);
                //                $carriageTrainset->update([
                //                    'qty' => $carriageTrainset->qty + $carriagePanelQty,
                //                ]);
            });

            return true;
        });
    }
}
