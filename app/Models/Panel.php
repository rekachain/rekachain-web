<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Panel extends Model {
    use HasFactory, HasFilterable, HasRelationships;

    protected $fillable = [
        'name',
        'description',
        'progress_id',
    ];
    protected $filterable = [
        'searchs' => ['name', 'description'],
        'columns' => ['progress_id'],
        'relation_columns' => [
            'projects' => [
                'id',
            ],
        ],
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

    // public function carriage_panels(): BelongsToMany {
    //     return $this->belongsToMany(CarriagePanel::class)->withPivot(['progress_id', 'carriage_id', 'panel_id'])->withTimestamps();
    // }

    // Temporary because belongsToMany return table carriage_panel_panel🗿
    public function carriage_panels(): HasMany {
        return $this->hasMany(CarriagePanel::class);
    }

    /**
     * Currently only used in canBeDeleted method
     */
    public function carriage_panel_components(): HasManyThrough {
        return $this->hasManyThrough(CarriagePanelComponent::class, CarriagePanel::class);
    }

    public function canBeDeleted(): bool {
        return $this->carriages()->doesntExist() && $this->carriage_panel_components()->doesntExist() ?? false;
    }

    public function projects(): HasManyDeep {
        return $this->hasManyDeep(Project::class, [
            CarriagePanel::class,
            CarriageTrainset::class,
            Trainset::class,
        ], [
            'panel_id',
            'id',
            'id',
            'id',
        ], [
            'id',
            'carriage_trainset_id',
            'trainset_id',
            'project_id',
        ]);
    }
}
