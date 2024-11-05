<?php

namespace App\Models;

use App\Support\Enums\TrainsetAttachmentTypeEnum;
use App\Support\Enums\TrainsetStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Trainset extends Model {
    use HasFactory, HasRelationships;

    protected $fillable = [
        'project_id',
        'preset_trainset_id',
        'name',
        'status',
    ];
    protected $casts = [
        'status' => TrainsetStatusEnum::class,
    ];

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }

    public function carriages(): BelongsToMany {
        return $this
            ->belongsToMany(Carriage::class)
            ->using(CarriageTrainset::class)
            ->withPivot(['id', 'qty'])
            ->withTimestamps();
    }

    public function preset_trainset(): BelongsTo {
        return $this->belongsTo(PresetTrainset::class);
    }

    public function carriage_trainsets(): HasMany {
        return $this->hasMany(CarriageTrainset::class);
    }

    public function panels(): HasManyDeep {
        return $this->hasManyDeep(
            Panel::class,
            [
                CarriageTrainset::class,
                CarriagePanel::class,
            ],
            [
                'trainset_id',
                'carriage_trainset_id',
                'id',
            ],
            [
                'id',
                'id',
                'panel_id',
            ]
        );
    }

    public function carriage_panels(): HasManyThrough {
        return $this->hasManyThrough(CarriagePanel::class, CarriageTrainset::class, 'trainset_id', 'carriage_trainset_id', 'id', 'id');
    }

    public function panel_materials(): HasManyDeep {
        return $this->hasManyDeep(
            PanelMaterial::class,
            [
                CarriageTrainset::class,
                CarriagePanel::class,
            ],
            [
                'trainset_id',
                'carriage_trainset_id',
                'carriage_panel_id',
            ],
            [
                'id',
                'id',
                'id',
            ]
        );
    }

    public function components(): HasManyDeep {
        return $this->hasManyDeep(
            Component::class,
            [
                CarriageTrainset::class,
                CarriagePanel::class,
                CarriagePanelComponent::class,
            ],
            [
                'trainset_id',
                'carriage_trainset_id',
                'carriage_panel_id',
                'id',
            ],
            [
                'id',
                'id',
                'id',
                'component_id',
            ]
        );
    }

    public function carriage_panel_components(): HasManyDeep {
        return $this->hasManyDeep(
            CarriagePanelComponent::class,
            [
                CarriageTrainset::class,
                CarriagePanel::class,
            ],
            [
                'trainset_id',
                'carriage_trainset_id',
                'carriage_panel_id',
            ],
            [
                'id',
                'id',
                'id',
            ]
        );
    }

    public function component_materials(): HasManyDeep {
        return $this->hasManyDeep(
            ComponentMaterial::class,
            [
                CarriageTrainset::class,
                CarriagePanel::class,
                CarriagePanelComponent::class,
            ],
            [
                'trainset_id',
                'carriage_trainset_id',
                'carriage_panel_id',
                'carriage_panel_component_id',
            ],
            [
                'id',
                'id',
                'id',
                'id',
            ]
        );
    }

    public function trainset_attachments(): HasMany {
        return $this->hasMany(TrainsetAttachment::class);
    }

    /**
     * panel_attachments:
     * flow : trainset -> carriage_trainsets -> carriage_panel -> panel_attachments
     */
    public function panel_attachments(): HasManyDeep {
        return $this->hasManyDeep(
            PanelAttachment::class,
            [
                CarriageTrainset::class,
                CarriagePanel::class,
            ],
            [
                'trainset_id',
                'carriage_trainset_id',
                'carriage_panel_id',
            ], [
                'id',
                'id',
                'id',
            ]);
    }

    public function canBeDeleted(): bool {
        return $this->status !== TrainsetStatusEnum::PROGRESS;
    }

    public function hasMechanicTrainsetAttachment(): bool {
        return $this->trainset_attachments->contains(function (TrainsetAttachment $trainsetAttachment) {
            return $trainsetAttachment->type === TrainsetAttachmentTypeEnum::MECHANIC;
        });
    }

    public function hasElectricTrainsetAttachment(): bool {
        return $this->trainset_attachments->contains(function (TrainsetAttachment $trainsetAttachment) {
            return $trainsetAttachment->type === TrainsetAttachmentTypeEnum::ELECTRIC;
        });
    }

    public function hasPanelAttachment(): bool {
        return $this->panel_attachments->isNotEmpty();
    }
}
