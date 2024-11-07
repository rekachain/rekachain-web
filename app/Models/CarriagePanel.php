<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class CarriagePanel extends Model {
    use HasFactory;

    protected $fillable = [
        'progress_id',
        'carriage_trainset_id',
        'panel_id',
        'qty',
    ];

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }

    public function carriage_trainset(): BelongsTo {
        return $this->belongsTo(CarriageTrainset::class);
    }

    public function carriage(): HasOneThrough {
        return $this->hasOneThrough(Carriage::class, CarriageTrainset::class, 'id', 'id', 'carriage_trainset_id', 'carriage_id');
    }

    public function panel(): BelongsTo {
        return $this->belongsTo(Panel::class);
    }

    public function carriage_panel_components(): HasMany {
        return $this->hasMany(CarriagePanelComponent::class);
    }

    public function panel_materials(): HasMany {
        return $this->hasMany(PanelMaterial::class);
    }

    public function panel_attachment(): HasOne {
        return $this->hasOne(PanelAttachment::class);
    }
}
