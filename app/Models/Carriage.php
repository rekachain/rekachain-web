<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Carriage extends Model
{
    use HasFactory;

    protected $table = 'carriage';

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
