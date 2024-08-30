<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CarriageTrainset extends Pivot {
    use HasFactory;

    protected $fillable = [
        'trainset_id',
        'carriage_id',
        'qty',
    ];

    public function trainset(): BelongsTo {
        return $this->belongsTo(Trainset::class);
    }

    public function carriage(): BelongsTo {
        return $this->belongsTo(Carriage::class);
    }

    public function carriage_panels(): HasMany {
        return $this->hasMany(CarriagePanel::class, 'carriage_trainset_id');
    }

    public function carriage_trainset(): BelongsTo {
        return $this->belongsTo(Carriage::class);
    }
}
