<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\CarriageTrainset;
use App\Support\Interfaces\Repositories\CarriageTrainsetRepositoryInterface;
use App\Support\Interfaces\Services\CarriageTrainsetServiceInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;
use Illuminate\Support\Facades\DB;

class CarriageTrainsetService extends BaseCrudService implements CarriageTrainsetServiceInterface {
    public function __construct(protected PanelServiceInterface $panelService) {
        parent::__construct();
    }

    protected function getRepositoryClass(): string {
        return CarriageTrainsetRepositoryInterface::class;
    }

    public function addPanel(CarriageTrainset $carriageTrainset, array $data): bool {
        return DB::transaction(function () use ($carriageTrainset, $data) {
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

            $carriageTrainset->carriage_panels()->create([
                'panel_id' => $panel->id,
                'progress_id' => $progressId,
                'carriage_trainset_id' => null,
                'qty' => $carriagePanelQty,
            ]);

            dump($carriageTrainset->carriage_panels);

            $carriageTrainset->trainset()->update([
                'preset_trainset_id' => null,
            ]);

            return true;
        });
    }
}
