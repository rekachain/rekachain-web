<?php

namespace App\Events\Trainset;

use App\Models\Trainset;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TrainsetPresetNullificationEvent {
    use Dispatchable, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Trainset $trainset) {}
}
