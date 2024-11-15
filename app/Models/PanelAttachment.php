<?php

namespace App\Models;

use App\Support\Enums\PanelAttachmentStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasOneDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class PanelAttachment extends Model {
    use HasFactory, HasRelationships;

    protected $fillable = [
        'carriage_panel_id',
        'source_workstation_id',
        'destination_workstation_id',
        'attachment_number',
        'qr_code',
        'qr_path',
        'current_step',
        'elapsed_time',
        'status',
        'panel_attachment_id',
        'supervisor_id',
    ];
    protected $casts = [
        'status' => PanelAttachmentStatusEnum::class,
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
            'detail_worker_panels' => [
                'worker_id',
            ],
            'trainset' => [
                'id',
                'project_id',
                'status',
            ],
        ]
    ];

    public function getFilterable(): array {
        return $this->filterable;
    }

    public function panel(): HasOneThrough {
        return $this->hasOneThrough(Panel::class, CarriagePanel::class, 'id', 'id', 'id', 'panel_id');
    }

    public function trainset(): HasOneDeep
    {
        return $this->hasOneDeep(
            Trainset::class, 
            [
                CarriagePanel::class, 
                CarriageTrainset::class
            ], [
                'id',
                'id', 
                'id'
            ], [
                'carriage_panel_id', 
                'carriage_trainset_id', 
                'trainset_id'
            ]);
    }

    public function progress(): HasOneThrough {
        return $this->hasOneThrough(Progress::class, CarriagePanel::class, 'id', 'id', 'carriage_panel_id', 'progress_id');
    }

    public function is_ancestor(): bool {
        return $this->parent === null;
    }

    public function parent(): BelongsTo {
        return $this->belongsTo(PanelAttachment::class, 'panel_attachment_id', 'id');
    }

    public function is_parent(): bool {
        return $this->childs->count() > 0;
    }

    public function childs(): HasMany {
        return $this->hasMany(PanelAttachment::class, 'panel_attachment_id', 'id');
    }

    public function is_child(): bool {
        return $this->parent !== null;
    }

    public function source_workstation(): BelongsTo {
        return $this->belongsTo(Workstation::class, 'source_workstation_id');
    }

    public function destination_workstation(): BelongsTo {
        return $this->belongsTo(Workstation::class, 'destination_workstation_id');
    }

    public function carriage_panel(): BelongsTo {
        return $this->belongsTo(CarriagePanel::class);
    }

    public function serial_panels(): HasMany {
        return $this->hasMany(SerialPanel::class);
    }

    public function detail_worker_panels(): HasManyThrough {
        return $this->hasManyThrough(DetailWorkerPanel::class, SerialPanel::class, 'panel_attachment_id', 'serial_panel_id', 'id', 'id');
    }

    public function supervisor(): BelongsTo {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function panel_attachment_handlers(): HasMany {
        return $this->hasMany(PanelAttachmentHandler::class);
    }

    public function raw_materials(): HasManyDeep {
        return $this->hasManyDeep(
            RawMaterial::class,
            [
                CarriagePanel::class,
                PanelMaterial::class,
            ],
            [
                'id',
                'carriage_panel_id',
                'id',
            ],
            [
                'carriage_panel_id',
                'id',
                'raw_material_id',
            ]
        );
    }

    public function panel_materials(): HasManyThrough {
        return $this->hasManyThrough(PanelMaterial::class, CarriagePanel::class, 'id', 'carriage_panel_id', 'carriage_panel_id', 'id');
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
