<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CarriageTrainset extends Pivot {
    use HasFactory, HasFilterable;

    public $incrementing = true;
    protected $fillable = [
        'trainset_id',
        'carriage_id',
        'qty',
    ];
    protected $filterable = [
        'searchs' => [],
        'columns' => [
            'trainset_id',
            'carriage_id',
            'qty',
        ],
        'relations' => [],
    ];

    public function trainset(): BelongsTo {
        return $this->belongsTo(Trainset::class);
    }

    public function carriage(): BelongsTo {
        return $this->belongsTo(Carriage::class);
    }

    public function carriage_panels(): HasMany {
        return $this->hasMany(CarriagePanel::class, 'carriage_trainset_id');
    }

    public function carriage_trainset(): BelongsTo {
        return $this->belongsTo(Carriage::class);
    }

    public function panel_attachments(): HasMany {
        return $this->hasMany(PanelAttachment::class, 'carriage_trainset_id');
    }
}
