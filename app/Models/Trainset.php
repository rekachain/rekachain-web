<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trainset extends Model {
    use HasFactory;

    protected $fillable = [
        'id_project',
        'name',
    ];

    // public function carriages(): HasMany
    // {
    //     return $this->hasMany(TrainsetCarriages::class, 'id_trainset', 'id');
    // }

    // public function projectAttachments(): HasMany
    // {
    //     return $this->hasMany(ProjectAttachment::class, 'id_trainset', 'id');
    // }

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }
}
