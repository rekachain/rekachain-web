<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PanelMaterial extends Model {
    use HasFactory;

    protected $fillable = [
        'carriage_panel_id',
        'raw_material_id',
        'qty',
    ];

    public function raw_material(): BelongsTo {
        return $this->belongsTo(Material::class);
    }

    public function carriage_panel(): BelongsTo {
        return $this->belongsTo(Panel::class);
    }
}
