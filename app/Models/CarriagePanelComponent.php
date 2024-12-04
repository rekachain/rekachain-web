<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarriagePanelComponent extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'component_id',
        'carriage_panel_id',
        'progress_id',
        'qty',
    ];
    protected $filterable = [
        'searchs' => [],
        'columns' => [
            'component_id',
            'carriage_panel_id',
            'progress_id',
            'qty',
        ],
        'relations' => [],
    ];

    public function component(): BelongsTo {
        return $this->belongsTo(Component::class);
    }

    public function carriage_panel(): BelongsTo {
        return $this->belongsTo(CarriagePanel::class);
    }

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }

    public function component_materials(): HasMany {
        return $this->hasMany(ComponentMaterial::class);
    }

    public function hasMaterials(): bool {
        return $this->component_materials->isNotEmpty();
    }
}
