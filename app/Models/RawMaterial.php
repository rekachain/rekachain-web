<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RawMaterial extends Model {
    use HasFactory;

    protected $fillable = [
        'kode_material',
        'description',
        'specs',
        'unit',
    ];

    
    protected $table = 'raw_materials';

    public function panels(): HasMany
    {
        return $this->hasMany(Panel::class);
    }

    public function components(): HasMany
    {
        return $this->hasMany(Component::class);
    }
}
