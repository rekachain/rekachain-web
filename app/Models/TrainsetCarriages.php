<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TrainsetCarriages extends Pivot {
    use HasFactory;

    protected $table = 'trainset_carriages';
    protected $fillable = [
        'trainset_id',
        'carriage_id',
        'qty',
    ];

    public function carriage(): BelongsTo {
        return $this->belongsTo(Carriage::class);
    }

    public function trainset(): BelongsTo {
        return $this->belongsTo(Trainset::class);
    }
}
