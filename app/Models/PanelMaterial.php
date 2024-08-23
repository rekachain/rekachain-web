<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PanelMaterial extends Model {
    use HasFactory;

    protected $fillable = [
        'panel_id',
        'material_id',
        'qty',
    ];

    public function material(): BelongsTo {
        return $this->belongsTo(Material::class);
    }

    public function panel(): BelongsTo {
        return $this->belongsTo(Panel::class);
    }
}
