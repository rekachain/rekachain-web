<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarriagePanel extends Model {
    protected $fillable = [
        'progress_id',
        'carriage_id',
        'panel_id',
    ];

    public function panel(): BelongsTo {
        return $this->belongsTo(Panel::class);
    }
}
