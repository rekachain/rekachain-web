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
        'name',
    ];

    public function carriages(): BelongsToMany {
        return $this->belongsToMany(Carriage::class)->withPivot('qty');
    }

    public function presetTrainset(): BelongsTo {
        return $this->belongsTo(PresetTrainset::class);
    }

    // public function projectAttachments(): HasMany
    // {
    //     return $this->hasMany(ProjectAttachment::class, 'id_trainset', 'id');
    // }

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }
}
