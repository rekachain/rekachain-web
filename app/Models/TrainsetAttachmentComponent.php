<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasOneDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class TrainsetAttachmentComponent extends Model {
    use HasFactory, HasFilterable, HasRelationships;

    protected $fillable = [
        'trainset_attachment_id',
        'carriage_panel_component_id',
        'total_required',
        'total_fulfilled',
        'total_failed',
    ];
    protected $filterable = [
        'search' => [],
        'columns' => ['trainset_attachment_id', 'carriage_panel_component_id'],
        'relations' => [
            'carriage_panel',
            'carriage_trainset',
            'carriage_panel_component',
        ],
    ];

    public function trainset_attachment(): BelongsTo {
        return $this->belongsTo(TrainsetAttachment::class);
    }

    public function carriage_panel_component(): BelongsTo {
        return $this->belongsTo(CarriagePanelComponent::class);
    }

    public function carriage_panel(): HasOneThrough {
        return $this->hasOneThrough(CarriagePanel::class, CarriagePanelComponent::class, 'id', 'id', 'carriage_panel_component_id', 'carriage_panel_id');
    }

    public function carriage_trainset(): HasOneDeep {
        return $this->hasOneDeep(CarriageTrainset::class, [
            CarriagePanelComponent::class,
            CarriagePanel::class,
        ], [
            'id',
            'id',
            'id',
        ], [
            'carriage_panel_component_id',
            'carriage_panel_id',
            'carriage_trainset_id',
        ]);
    }

    public function detail_worker_trainsets(): HasMany {
        return $this->hasMany(DetailWorkerTrainset::class);
    }

    public function progress_steps(): HasManyDeep {
        return $this->hasManyDeep(ProgressStep::class, [
            CarriagePanelComponent::class,
            Progress::class,
        ], [
            'id',
            'id',
            'progress_id',
        ], [
            'carriage_panel_component_id',
            'progress_id',
            'id',
        ]);
    }
}
