<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarriagePreset extends Model {
    use HasFactory;

    protected $fillable = [
        'preset_trainset_id',
        'carriage_id',
        'qty',
    ];

    public function presetTrainset(): BelongsTo {
        return $this->belongsTo(PresetTrainset::class);
    }

    public function carriage(): BelongsTo {
        return $this->belongsTo(Carriage::class);
    }
}
