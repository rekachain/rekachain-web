<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Component extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'progress_id',
        'carriage_panel_id',
    ];

    public function panel(): BelongsTo {
        return $this->belongsTo(CarriagePanel::class);
    }

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }
}
