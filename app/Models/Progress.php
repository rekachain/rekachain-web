<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Progress extends Model {
    protected $fillable = [
        'name',
        'work_aspect_id',
    ];

    use HasFactory;

    public function panels(): HasMany {
        return $this->hasMany(Panel::class);
    }

    public function carriage_panels(): HasMany {
        return $this->hasMany(CarriagePanel::class);
    }

    public function components(): HasMany {
        return $this->hasMany(Component::class);
    }

    public function carriage_panel_components(): HasMany {
        return $this->hasMany(CarriagePanelComponent::class);
    }

    public function steps(): HasManyThrough {
        return $this->hasManyThrough(Step::class, ProgressStep::class, 'progress_id', 'id', 'id', 'step_id');

    }
    public function progress_steps(): HasMany {
        return $this->hasMany(ProgressStep::class);
    }

    public function work_aspect(): BelongsTo {
        return $this->belongsTo(WorkAspect::class);
    }
}
