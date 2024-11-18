<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ComponentMaterial extends Pivot {
    use HasFactory;

    protected $table = 'component_materials';
    public $incrementing = true;
    protected $fillable = [
        'carriage_panel_component_id',
        'raw_material_id',
        'qty',
    ];

    public function carriage_panel_component(): BelongsTo {
        return $this->belongsTo(CarriagePanelComponent::class);
    }

    public function raw_material(): BelongsTo {
        return $this->belongsTo(RawMaterial::class);
    }
}
