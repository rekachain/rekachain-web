<?php

namespace App\Listeners\Trainset;

use App\Events\Trainset\TrainsetPresetNullificationEvent;
use App\Support\Interfaces\Services\TrainsetServiceInterface;

class TrainsetPresetNullificationListener {
    /**
     * Create the event listener.
     */
    public function __construct(protected TrainsetServiceInterface $trainsetService) {}

    /**
     * Handle the event.
     */
    public function handle(TrainsetPresetNullificationEvent $event): void {
        $trainset = $event->trainset;
        $this->trainsetService->update($trainset, ['preset_trainset_id' => null]);
    }
}
