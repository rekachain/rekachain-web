<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workstation extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'workshop_id',
        'division_id',
        'name',
        'location',
    ];

    protected $filterable = [
        'searchs' => ['name', 'location'],
        'columns' => ['workshop_id', 'division_id', 'name', 'location'],
    ];

    public function workshop(): BelongsTo {
        return $this->belongsTo(Workshop::class);
    }

    public function division(): BelongsTo {
        return $this->belongsTo(Division::class);
    }

    public function panel_attachment_source_workstations(): HasMany {
        return $this->hasMany(PanelAttachment::class, 'source_workstation_id');
    }

    public function panel_attachment_destination_workstations(): HasMany {
        return $this->hasMany(PanelAttachment::class, 'destination_workstation_id');
    }

    public function trainset_attachment_source_workstations(): HasMany {
        return $this->hasMany(TrainsetAttachment::class, 'source_workstation_id');
    }

    public function trainset_attachment_destination_workstations(): HasMany {
        return $this->hasMany(TrainsetAttachment::class, 'destination_workstation_id');
    }

    public function users(): HasMany {
        return $this->hasMany(User::class);
    }

    public function canBeDeleted(): bool {
        return $this->users->isEmpty() &&
            $this->panel_attachment_source_workstations->isEmpty() &&
            $this->panel_attachment_destination_workstations->isEmpty() &&
            $this->trainset_attachment_source_workstations->isEmpty() &&
            $this->trainset_attachment_destination_workstations->isEmpty();
    }
}
