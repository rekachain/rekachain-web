<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'initial_date',
    ];

    public function trainsets(): HasMany {
        return $this->hasMany(Trainset::class);
    }

    public function preset_trainsets() {
        return $this->hasMany(PresetTrainset::class);
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
