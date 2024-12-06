<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PanelMaterial extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'carriage_panel_id',
        'raw_material_id',
        'qty',
    ];

    protected $filterable = [
        'searchs' => ['qty'],
        'columns' => [
            'carriage_panel_id',
            'raw_material_id',
        ]
    ];

    public function raw_material(): BelongsTo {
        return $this->belongsTo(RawMaterial::class);
    }

    public function carriage_panel(): BelongsTo {
        return $this->belongsTo(CarriagePanel::class);
    }
}
