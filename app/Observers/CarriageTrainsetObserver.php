<?php

namespace App\Observers;

use App\Events\Trainset\TrainsetPresetNullificationEvent;
use App\Models\CarriageTrainset;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;

class CarriageTrainsetObserver implements ShouldHandleEventsAfterCommit {
    /**
     * Handle the CarriageTrainset "created" event.
     */
    public function created(CarriageTrainset $carriageTrainset): void {
        event(new TrainsetPresetNullificationEvent($carriageTrainset->trainset));
    }

    /**
     * Handle the CarriageTrainset "updated" event.
     */
    public function updated(CarriageTrainset $carriageTrainset): void {
        event(new TrainsetPresetNullificationEvent($carriageTrainset->trainset));
    }

    /**
     * Handle the CarriageTrainset "deleted" event.
     */
    public function deleted(CarriageTrainset $carriageTrainset): void {
        event(new TrainsetPresetNullificationEvent($carriageTrainset->trainset));
    }

    /**
     * Handle the CarriageTrainset "restored" event.
     */
    public function restored(CarriageTrainset $carriageTrainset): void {
        event(new TrainsetPresetNullificationEvent($carriageTrainset->trainset));
    }

    /**
     * Handle the CarriageTrainset "force deleted" event.
     */
    public function forceDeleted(CarriageTrainset $carriageTrainset): void {
        event(new TrainsetPresetNullificationEvent($carriageTrainset->trainset));
    }
}
