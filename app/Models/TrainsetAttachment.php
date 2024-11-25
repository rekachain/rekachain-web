<?php

namespace App\Models;

use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class TrainsetAttachment extends Model {
    use HasFactory, HasRelationships;

    protected $fillable = [
        'trainset_id',
        'source_workstation_id',
        'destination_workstation_id',
        'attachment_number',
        'type',
        'qr_code',
        'qr_path',
        'elapsed_time',
        'trainset_attachment_id',
        'supervisor_id',
        'status',
    ];

    protected $casts = [
        'type' => TrainsetAttachmentTypeEnum::class,
        'status' => TrainsetAttachmentStatusEnum::class,
    ];

    protected $filterable = [
        'searchs' => [
            'attachment_number',
            'status',
        ],
        'relation_searchs' => [],
        'columns' => [
            'id',
            'source_workstation_id', 
            'destination_workstation_id', 
            'status', 
            'panel_attachment_id', 
            'supervisor_id', 
        ],
        'relation_columns' => [
            'detail_worker_trainsets' => [
                'worker_id',
            ],
            'trainset' => [
                'id',
                'project_id',
                'status',
                'name',
            ],
        ]
    ];

    public function getFilterable(): array {
        return $this->filterable;
    }

    public function ancestor(): TrainsetAttachment {
        $attachment = $this;
        while ($attachment->parent) {
            $attachment = $attachment->parent;
        }
        return $attachment;
    }

    public function is_ancestor(): bool {
        return $this->parent === null;
    }

    public function parent(): BelongsTo {
        return $this->belongsTo(TrainsetAttachment::class, 'trainset_attachment_id');
    }

    public function is_parent(): bool {
        return $this->childs->count() > 0;
    }

    public function childs(): HasMany {
        return $this->hasMany(TrainsetAttachment::class, 'trainset_attachment_id');
    }

    public function is_child(): bool {
        return $this->parent !== null;
    }
    
    public function progresses(): HasManyDeep {
        return $this->hasManyDeep(
            Progress::class, 
            [
                TrainsetAttachmentComponent::class,
                CarriagePanelComponent::class,
            ],
            [
                'trainset_attachment_id',
                'id',
                'id',
            ],
            [
                'id',
                'carriage_panel_component_id',
                'progress_id',
            ]
        );
    }

    public function trainset(): BelongsTo {
        return $this->belongsTo(Trainset::class);
    }

    public function source_workstation(): BelongsTo {
        return $this->belongsTo(Workstation::class, 'source_workstation_id');
    }

    public function destination_workstation(): BelongsTo {
        return $this->belongsTo(Workstation::class, 'destination_workstation_id');
    }

    public function supervisor(): BelongsTo {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function trainset_attachment_handlers(): HasMany {
        return $this->hasMany(TrainsetAttachmentHandler::class);
    }

    public function raw_materials(): HasManyDeep {
        return $this->hasManyDeep(
            RawMaterial::class,
            [
                TrainsetAttachmentComponent::class,
                CarriagePanelComponent::class,
                ComponentMaterial::class,
            ],
            [
                'trainset_attachment_id',
                'id',
                'carriage_panel_component_id',
                'id',
            ],
            [
                'id',
                'carriage_panel_component_id',
                'id',
                'raw_material_id',
            ]
        )->distinct();
    }

    public function component_materials(): HasManyDeep {
        return $this->hasManyDeep(
            ComponentMaterial::class,
            [
                TrainsetAttachmentComponent::class,
                CarriagePanelComponent::class,
            ],
            [
                'trainset_attachment_id',
                'id',
                'carriage_panel_component_id',
            ],
            [
                'id',
                'carriage_panel_component_id',
                'id',
            ]
        );
    }

    public function trainset_attachment_components(): HasMany {
        return $this->hasMany(TrainsetAttachmentComponent::class);
    }

    public function components(): HasManyDeep {
        return $this->hasManyDeep(
            Component::class,
            [
                TrainsetAttachmentComponent::class,
                CarriagePanelComponent::class,
            ],
            [
                'trainset_attachment_id',
                'id',
                'carriage_panel_component_id',
            ],
            [
                'id',
                'carriage_panel_component_id',
                'id',
            ]
        );
    }

    public function carriage_panel_components(): HasManyThrough {
        return $this->hasManyThrough(CarriagePanelComponent::class, TrainsetAttachmentComponent::class, 'trainset_attachment_id', 'id', 'id', 'carriage_panel_component_id');
    }

    public function detail_worker_trainsets(): HasManyThrough {
        return $this->hasManyThrough(DetailWorkerTrainset::class, TrainsetAttachmentComponent::class, 'trainset_attachment_id', 'trainset_attachment_component_id', 'id', 'id');
    }

    public function attachment_notes(): MorphMany {
        return $this->morphMany(AttachmentNote::class, 'attachment_noteable');
    }

    public function custom_attachment_materials(): MorphMany {
        return $this->morphMany(CustomAttachmentMaterial::class, 'custom_attachment_materialable');
    }

    public function getQrAttribute(): ?string {
        return $this->qr_path ? asset('storage/' . $this->qr_path) : null;
    }
}
