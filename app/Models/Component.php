<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Component extends Model {
    use HasFactory, HasFilterable, HasRelationships;

    protected $fillable = [
        'name',
        'description',
        'progress_id',
        'vendor_name',
        'vendor_qty',
    ];
    protected $filterable = [
        'searchs' => [
            'name',
            'description',
        ],
        'columns' => [
            'id',
            'progress_id',
        ],
        'relations' => [
            'trainset_attachments',
        ],
        'relation_columns' => [
            'projects' => [
                'id',
            ],
        ],
    ];

    public function carriage_panel_components(): HasMany {
        return $this->hasMany(CarriagePanelComponent::class);
    }

    public function trainset_attachments(): HasManyDeep {
        return $this->hasManyDeep(TrainsetAttachment::class, [
            CarriagePanelComponent::class,
            TrainsetAttachmentComponent::class,
        ], [
            'component_id',
            'carriage_panel_component_id',
            'id',
        ], [
            'id',
            'id',
            'trainset_attachment_id',
        ]);
    }

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }

    public function canBeDeleted(): bool {
        return $this->carriage_panel_components()->count() === 0;
    }

    public function product_problems(): HasMany {
        return $this->hasMany(ProductProblem::class);
    }

    public function hasProductProblem(): bool {
        return $this->product_problems()->count() > 0;
    }

    public function projects(): HasManyDeep {
        return $this->hasManyDeep(Project::class, [
            CarriagePanelComponent::class,
            CarriagePanel::class,
            CarriageTrainset::class,
            Trainset::class,
        ], [
            'component_id',
            'id',
            'id',
            'id',
            'id',
        ], [
            'id',
            'carriage_panel_id',
            'carriage_trainset_id',
            'trainset_id',
            'project_id',
        ]);
    }
}
