<?php

namespace App\Models;

use App\Support\Enums\TrainsetAttachmentTypeEnum;
use App\Support\Enums\TrainsetStatusEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Trainset extends Model {
    use HasFactory, HasFilterable, HasRelationships;

    protected $fillable = [
        'project_id',
        'preset_trainset_id',
        'name',
        'status',
        'mechanical_time',
        'electrical_time',
        'assembly_time',
        'calculated_estimate_time',
        'initial_date',
        'estimated_end_date',
    ];
    protected $casts = [
        'status' => TrainsetStatusEnum::class,
    ];
    protected $filterable = [
        'searchs' => [
            'name',
        ],
        'columns' => [
            'id',
            'project_id',
            'name',
            'status',
        ],
        'relation_columns' => [
            'project' => [
                'id',
                'name',
            ],
            'carriages' => [
                'type',
                'description',
            ],
            'trainset_attachments' => [
                'source',
                'description',
            ],
            'panel_attachments' => [
                'type',
                'description',
            ],
        ],
    ];

    public function getFilterable(): array {
        return $this->filterable;
    }

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

    public function trainset_attachment_components(): HasManyThrough {
        return $this->hasManyThrough(TrainsetAttachmentComponent::class, TrainsetAttachment::class);
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

    public function serial_panels(): HasManyDeep {
        return $this->hasManyDeep(
            SerialPanel::class,
            [
                CarriageTrainset::class,
                CarriagePanel::class,
                PanelAttachment::class,
            ],
            [
                'trainset_id',
                'carriage_trainset_id',
                'carriage_panel_id',
                'panel_attachment_id',
            ],
            [
                'id',
                'id',
                'id',
                'id',
            ]
        );
    }

    public function canBeDeleted(): bool {
        return !in_array($this->status, [TrainsetStatusEnum::PROGRESS, TrainsetStatusEnum::DONE]) && $this->carriage_trainsets()->count() === 0;
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
