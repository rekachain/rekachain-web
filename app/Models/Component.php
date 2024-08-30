<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Component extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'progress_id',
    ];

    public function carriage_panel_component(): HasMany {
        return $this->hasMany(CarriagePanelComponent::class);
    }

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }
}
