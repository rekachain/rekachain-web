<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Carriage extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'type',
        'description',
    ];
    protected $filterable = [
        'searchs' => ['type', 'description'],
    ];

    public function trainsets(): BelongsToMany {
        return $this
            ->belongsToMany(Trainset::class)
            ->using(CarriageTrainset::class)
            ->withPivot(['id', 'qty'])
            ->withTimestamps();
    }

    public function carriage_panels(): HasManyThrough {
        return $this->hasManyThrough(CarriagePanel::class, CarriageTrainset::class, 'carriage_id', 'carriage_trainset_id');
    }

    public function canBeDeleted() {
        return $this->trainsets()->doesntExist();
    }
}
