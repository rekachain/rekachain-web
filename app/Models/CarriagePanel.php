<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarriagePanel extends Model {
    protected $fillable = [
        'progress_id',
        'carriage_id',
        'panel_id',
        'qty',
    ];

    public function carriage(): BelongsTo {
        return $this->belongsTo(Carriage::class);
    }

    public function panel(): BelongsTo {
        return $this->belongsTo(Panel::class);
    }

    public function components(): HasMany {
        return $this->hasMany(Component::class);
    }
}
