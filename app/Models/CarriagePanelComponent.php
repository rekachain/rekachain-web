<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CarriagePanelComponent extends Pivot
{
    //
    protected $fillable = [
        'component_id',
        'carriage_panel_id',
        'progress_id',
        'qty',
    ];

    public function component(): BelongsTo
    {
        return $this->belongsTo(Component::class);
    }

    public function carriage_panel(): BelongsTo
    {
        return $this->belongsTo(CarriagePanel::class);
    }

    public function progress(): BelongsTo
    {
        return $this->belongsTo(Progress::class);
    }
}