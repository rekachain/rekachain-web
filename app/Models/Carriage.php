<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carriage extends Model {
    use HasFactory;

    protected $fillable = [
        'type',
        'description',
    ];

    public function trainsets(): BelongsToMany {
        return $this->belongsToMany(CarriageTrainset::class)->withPivot('qty')->withTimestamps();
    }

    public function panels(): HasMany {
        return $this->hasMany(Panel::class);
    }
}
