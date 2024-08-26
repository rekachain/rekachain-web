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
        return $this
            ->belongsToMany(Carriage::class)
            ->using(CarriageTrainset::class)
            ->withPivot(['id', 'qty'])
            ->withTimestamps();
    }

    public function preset_trainset(): BelongsTo {
        return $this->belongsTo(PresetTrainset::class);
    }

    //    public function carriage_trainset(): BelongsToMany {
    //        return $this->belongsToMany(Carriage::class, 'carriage_trainset')->withPivot('qty')->withTimestamps();
    //    }

    // public function project_attachments(): HasMany
    // {
    //     return $this->hasMany(ProjectAttachment::class, 'id_trainset', 'id');
    // }

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }
}
