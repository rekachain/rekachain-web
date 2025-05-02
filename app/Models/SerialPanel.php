<?php

namespace App\Models;

use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Staudenmeir\EloquentHasManyDeep\HasOneDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class SerialPanel extends Model {
    use HasFactory, HasFilterable, HasRelationships;

    protected $fillable = [
        'product_no',
        'panel_attachment_id',
        'qr_code',
        'qr_path',
        'manufacture_status',
        'notes',
    ];
    protected $casts = [
        'manufacture_status' => SerialPanelManufactureStatusEnum::class,
    ];
    protected $filterable = [
        'searchs' => ['product_no', 'notes', 'manufacture_status'],
        'columns' => ['panel_attachment_id', 'manufacture_status'],
    ];

    public function panel_attachment(): BelongsTo {
        return $this->belongsTo(PanelAttachment::class);
    }

    public function detail_worker_panels(): HasMany {
        return $this->hasMany(DetailWorkerPanel::class);
    }

    public function project(): HasOneDeep {
        return $this->hasOneDeep(
            Project::class,
            [
                PanelAttachment::class,
                CarriagePanel::class,
                CarriageTrainset::class,
                Trainset::class,
            ],
            [
                'id',
                'id',
                'id',
                'id',
                'id',
            ],
            [
                'panel_attachment_id',
                'carriage_panel_id',
                'carriage_trainset_id',
                'trainset_id',
                'project_id',
            ]
        );
    }

    public function trainset() : HasOneDeep {
        return $this->hasOneDeep(
            Trainset::class,
            [
                PanelAttachment::class,
                CarriagePanel::class,
                CarriageTrainset::class,
            ],
            [
                'id',
                'id',
                'id',
                'id',
            ],
            [
                'panel_attachment_id',
                'carriage_panel_id',
                'carriage_trainset_id',
                'trainset_id',
            ]
        );
    }

    public function carriage() : HasOneDeep {
        return $this->hasOneDeep(
            Carriage::class,
            [
                PanelAttachment::class,
                CarriagePanel::class,
                CarriageTrainset::class,
            ],
            [
                'id',
                'id',
                'id',
                'id',
            ],
            [
                'panel_attachment_id',
                'carriage_panel_id',
                'carriage_trainset_id',
                'carriage_id',
            ]
        );
    }
}
