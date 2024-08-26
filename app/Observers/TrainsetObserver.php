<?php

namespace App\Observers;

use App\Models\Trainset;

class TrainsetObserver {
    /**
     * Handle the Trainset "created" event.
     */
    public function created(Trainset $trainset): void {
        if ($trainset->name === null) {
            $trainset->update(['name' => 'TS ' . $trainset->id]);
        }
    }

    /**
     * Handle the Trainset "updated" event.
     */
    public function updated(Trainset $trainset): void {
        //
    }

    /**
     * Handle the Trainset "deleted" event.
     */
    public function deleted(Trainset $trainset): void {
        //
    }

    /**
     * Handle the Trainset "restored" event.
     */
    public function restored(Trainset $trainset): void {
        //
    }

    /**
     * Handle the Trainset "force deleted" event.
     */
    public function forceDeleted(Trainset $trainset): void {
        //
    }
}
