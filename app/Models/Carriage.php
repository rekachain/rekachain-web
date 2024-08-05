<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Carriage extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'description',
    ];

    public function car_ts(): HasMany
    {
        return $this->hasMany(TrainsetCarriages::class);
    }

    public function car_pan(): HasMany
    {
        return $this->hasMany(CarriagePanels::class);
    }
}
