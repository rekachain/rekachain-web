<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PresetTrainset extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'project_id',
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function trainsets() {
        return $this->hasMany(Trainset::class);
    }

    public function carriagePresets(): HasMany {
        return $this->hasMany(CarriagePreset::class);
    }
}
