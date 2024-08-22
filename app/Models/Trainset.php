<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Trainset extends Model {
    use HasFactory;

    protected $fillable = [
        'project_id',
        'preset_trainset_id',
        'name',
    ];

    public function carriages(): BelongsToMany {
        return $this->belongsToMany(Carriage::class)->withPivot(['id', 'qty']);
    }

    public function presetTrainset(): BelongsTo {
        return $this->belongsTo(PresetTrainset::class);
    }

    //    public function carriageTrainset(): BelongsToMany {
    //        return $this->belongsToMany(Carriage::class, 'carriage_trainset')->withPivot('qty')->withTimestamps();
    //    }

    // public function projectAttachments(): HasMany
    // {
    //     return $this->hasMany(ProjectAttachment::class, 'id_trainset', 'id');
    // }

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }
}
