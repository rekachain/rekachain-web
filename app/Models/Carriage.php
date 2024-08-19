<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carriage extends Model {
    use HasFactory;

    protected $fillable = [
        'type',
        'description',
    ];

    // public function trainsets(): HasMany
    // {
    //     return $this->hasMany(TrainsetCarriages::class, 'id_carriage', 'id');
    // }

    // public function panels(): HasMany
    // {
    //     return $this->hasMany(CarriagePanels::class, 'id_carriage', 'id');
    // }
}
