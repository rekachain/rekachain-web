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

    public function panels(): HasMany {
        return $this->hasMany(Panel::class);
    }

    public function components(): HasMany {
        return $this->hasMany(Component::class);
    }
}
