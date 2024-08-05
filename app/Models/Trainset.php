<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Trainset extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_project',
        'name',
    ];

    public function ts_car(): HasMany
    {
        return $this->hasMany(TrainsetCarriages::class, 'id_trainset', 'id_trainset');
    }

    public function project_attachment(): HasMany
    {
        return $this->hasMany(ProjectAttachment::class, 'id_trainset', 'id_trainset');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'id_project', 'id_project');
    }
}
