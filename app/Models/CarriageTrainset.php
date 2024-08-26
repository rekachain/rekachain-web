<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CarriageTrainset extends Pivot {
    use HasFactory;

    protected $fillable = [
        'trainset_id',
        'carriage_id',
        'qty',
    ];

    public function trainset() {
        return $this->belongsTo(Trainset::class);
    }

    public function carriage() {
        return $this->belongsTo(Carriage::class);
    }
}
