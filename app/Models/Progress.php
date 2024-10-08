<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Progress extends Model {
    protected $fillable = [
        'name',
    ];

    use HasFactory;

    public function panels(): HasMany {
        return $this->hasMany(Panel::class);

    }

    public function steps(): HasMany {
        return $this->hasMany(Step::class);
    
    }
    public function progress_steps(): HasMany {
        return $this->hasMany(ProgressStep::class);
    }

    public function work_aspect(): BelongsTo {
        return $this->belongsTo(WorkAspect::class);
    }
}