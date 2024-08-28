<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Trainset extends Model {
    use HasFactory;

    protected $fillable = [
        'project_id',
        'preset_trainset_id',
        'name',
    ];

    public function carriages(): BelongsToMany {
        return $this
            ->belongsToMany(Carriage::class)
            ->using(CarriageTrainset::class)
            ->withPivot(['id', 'qty'])
            ->withTimestamps();
    }

    public function preset_trainset(): BelongsTo {
        return $this->belongsTo(PresetTrainset::class);
    }

    public function carriage_trainsets(): HasMany {
        return $this->hasMany(CarriageTrainset::class);
    }

    public function carriage_panels(): HasManyThrough {
        return $this->hasManyThrough(CarriagePanel::class, CarriageTrainset::class, 'trainset_id', 'carriage_trainset_id', 'id', 'id');
    }

    // public function project_attachments(): HasMany
    // {
    //     return $this->hasMany(ProjectAttachment::class, 'id_trainset', 'id');
    // }

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }
}
