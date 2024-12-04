<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Project extends Model {
    use HasFactory, HasRelationships;

    protected $fillable = [
        'name',
        'initial_date',
        'calculated_estimate_time',
        'estimated_end_date',
    ];
    protected $filterable = [
        'searchs' => [
            'name',
            'initial_date',
        ],
        'columns' => [
            'name',
            'initial_date',
        ],
        'relation_columns' => [
            // 'carriages' => [
            //     'type',
            // ],
            // 'trainsets' => [
            //     'name',
            // ]
        ],
    ];

    public function getFilterable(): array {
        return $this->filterable;
    }

    public function carriages(): HasManyDeep {
        return $this->hasManyDeep(
            Carriage::class, // The final target model is Carriage itself
            [
                Trainset::class,
                CarriageTrainset::class,
            ],
            [
                'project_id',
                'trainset_id',
                'id',
            ],
            [
                'id',
                'id',
                'carriage_id',
            ]
        );
    }

    public function trainsets(): HasMany {
        return $this->hasMany(Trainset::class);
    }

    public function trainset_attachments(): HasManyThrough {
        return $this->hasManyThrough(TrainsetAttachment::class, Trainset::class);
    }

    public function preset_trainsets() {
        return $this->hasMany(PresetTrainset::class);
    }

    public function carriage_trainsets(): HasManyThrough {
        return $this->hasManyThrough(CarriageTrainset::class, Trainset::class);
    }

    public function panels(): HasManyDeep {
        return $this->hasManyDeep(
            Panel::class, // The final target model is Panel itself
            [
                Trainset::class,
                CarriageTrainset::class,
                CarriagePanel::class,
            ],
            [
                'project_id',          // Foreign key on the Trainset table
                'trainset_id',         // Foreign key on the CarriageTrainset table
                'carriage_trainset_id', // Foreign key on the CarriagePanel table
                'id',                   // Foreign key on the Panel table in CarriagePanel
            ],
            [
                'id',                  // Local key on the Panel table
                'id',                  // Local key on the Trainset table
                'id',                  // Local key on the CarriageTrainset table
                'panel_id',             // Local key on the CarriagePanel table
            ]
        );
    }

    public function carriage_panels(): HasManyDeep {
        return $this->hasManyDeep(
            CarriagePanel::class, // The final target model is CarriagePanel itself
            [
                Trainset::class,
                CarriageTrainset::class,
            ],
            [
                'project_id',          // Foreign key on the Trainset table
                'trainset_id',         // Foreign key on the CarriageTrainset table
                'carriage_trainset_id', // Foreign key on the CarriagePanel table
            ],
            [
                'id',                  // Local key on the CarriagePanel table
                'id',                  // Local key on the Trainset table
                'id',                  // Local key on the CarriageTrainset table
            ]
        );
    }

    public function panel_attachments(): HasManyDeep {
        return $this->hasManyDeep(
            PanelAttachment::class,
            [
                Trainset::class,
                CarriageTrainset::class,
                CarriagePanel::class,
            ],
            [
                'project_id',          // Foreign key on the Trainset table
                'trainset_id',         // Foreign key on the CarriageTrainset table
                'carriage_trainset_id', // Foreign key on the CarriagePanel table
                'carriage_panel_id',   // Foreign key on the CarriagePanelComponent table
            ],
            [
                'id',                  // Local key on the Component table
                'id',                  // Local key on the Trainset table
                'id',                  // Local key on the CarriageTrainset table
                'id',                  // Local key on the CarriagePanel table
            ]
        );
    }

    public function components(): HasManyDeep {
        return $this->hasManyDeep(
            Component::class, // The final target model is Component itself
            [
                Trainset::class,
                CarriageTrainset::class,
                CarriagePanel::class,
                CarriagePanelComponent::class,
            ],
            [
                'project_id',          // Foreign key on the Trainset table
                'trainset_id',         // Foreign key on the CarriageTrainset table
                'carriage_trainset_id', // Foreign key on the CarriagePanel table
                'carriage_panel_id',   // Foreign key on the CarriagePanelComponent table
                'id',                   // Foreign key on the Component table in CarriagePanel
            ],
            [
                'id',                  // Local key on the Component table
                'id',                  // Local key on the Trainset table
                'id',                  // Local key on the CarriageTrainset table
                'id',                  // Local key on the CarriagePanel table
                'component_id',         // Local key on the CarriagePanel table
            ]
        );
    }

    public function carriage_panel_components(): HasManyDeep {
        return $this->hasManyDeep(
            CarriagePanelComponent::class, // The final target model is CarriagePanelComponent itself
            [
                Trainset::class,
                CarriageTrainset::class,
                CarriagePanel::class,
            ],
            [
                'project_id',          // Foreign key on the Trainset table
                'trainset_id',         // Foreign key on the CarriageTrainset table
                'carriage_trainset_id', // Foreign key on the CarriagePanel table
            ],
            [
                'id',                  // Local key on the CarriagePanelComponent table
                'id',                  // Local key on the Trainset table
                'id',                  // Local key on the CarriageTrainset table
            ]
        );
    }

    public function canBeDeleted(): bool {
        foreach ($this->trainsets as $trainset) {
            if ($trainset->carriages()->exists()) {
                return false;
            }
        }

        return true;
    }

    // public function projectAttachments(): HasMany
    // {
    //     return $this->hasMany(ProjectAttachment::class, 'id_project', 'id');
    // }
}
