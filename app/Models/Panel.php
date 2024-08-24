<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Panel extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function carriages(): BelongsToMany {
        return $this->belongsToMany(CarriagePanel::class)->withPivot(['progress_id', 'carriage_id', 'panel_id'])->withTimestamps();
    }

    public function carriage_panels(): BelongsToMany {
        return $this->belongsToMany(CarriagePanel::class)->withPivot(['progress_id', 'carriage_id', 'panel_id'])->withTimestamps();
    }
}
