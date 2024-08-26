<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Panel extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function carriages(): BelongsToMany {
        return $this->belongsToMany(CarriagePanel::class)->withPivot(['progress_id', 'carriage_id', 'panel_id'])->withTimestamps();
    }

    public function components(): HasMany {
        return $this->hasMany(Component::class);
    }

    public function carriage_panels(): BelongsToMany {
        return $this->belongsToMany(CarriagePanel::class)->withPivot(['progress_id', 'carriage_id', 'panel_id'])->withTimestamps();
    }
}
