<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Carriage extends Model {
    use HasFactory;

    protected $fillable = [
        'type',
        'description',
    ];

    public function trainsets(): BelongsToMany {
        return $this->belongsToMany(TrainsetCarriages::class, 'trainset_carriages')->using(TrainsetCarriages::class)->withPivot('qty');
    }

    // public function panels(): HasMany
    // {
    //     return $this->hasMany(CarriagePanels::class, 'id_carriage', 'id');
    // }
}
