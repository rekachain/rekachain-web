<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Panel extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'progress_id',
    ];

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }

    public function carriages(): BelongsToMany {
        return $this->belongsToMany(Carriage::class, 'carriage_panels', relatedPivotKey: 'carriage_trainset_id')->using(CarriagePanel::class)->withPivot(['progress_id', 'carriage_id', 'panel_id'])->withTimestamps();
    }

    public function components(): HasMany {
        return $this->hasMany(Component::class);
    }

    public function carriage_panels(): BelongsToMany {
        return $this->belongsToMany(CarriagePanel::class)->withPivot(['progress_id', 'carriage_id', 'panel_id'])->withTimestamps();
    }

    /**
     * Currently only used in canBeDeleted method
     */
    public function carriage_panel_components(): HasManyThrough {
        return $this->hasManyThrough(CarriagePanelComponent::class, CarriagePanel::class);
    }

    public function canBeDeleted(): bool {
        return $this->carriages()->doesntExist() && $this->carriage_panel_components()->doesntExist();
    }
}
