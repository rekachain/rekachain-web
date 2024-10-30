<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RawMaterial extends Model {
    use HasFactory;

    protected $fillable = [
        'material_code',
        'description',
        'unit',
        'specs',
    ];

    /**
     * @deprecated
     */
    public function panels(): HasMany {
        return $this->hasMany(Panel::class);
    }

    /**
     * @deprecated
     */
    public function components(): HasMany {
        return $this->hasMany(Component::class);
    }

    public function panel_materials(): HasMany {
        return $this->hasMany(PanelMaterial::class);
    }

    public function component_materials(): HasMany {
        return $this->hasMany(ComponentMaterial::class);
    }

    public function canBeDeleted(): bool {
        return $this->panel_materials->isEmpty() && $this->component_materials->isEmpty();
    }
}
