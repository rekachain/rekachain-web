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
        return $this
            ->belongsToMany(Trainset::class)
            ->using(CarriageTrainset::class)
            ->withPivot(['id', 'qty'])
            ->withTimestamps();
    }

    //    public function carriage_panels(): HasManyThrough {
    //        return $this->hasManyThrough(CarriagePanel::class, CarriageTrainset::class);
    //    }

    //    public function trainsets(): BelongsToMany {
    //        return $this->belongsToMany(Trainset::class, 'carriage_trainset', 'carriage_id', 'trainset_id')
    //            ->withPivot(['id', 'qty'])
    //            ->withTimestamps();
    //    }

    //    public function carriage_panels(): HasMany {
    //        return $this->hasMany(CarriagePanel::class, 'carriage_trainset_id', 'id');
    //    }
}
