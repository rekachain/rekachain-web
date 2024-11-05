<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workshop extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
    ];

    public function workstations(): HasMany {
        return $this->hasMany(Workstation::class);
    }

    public function canBeDeleted(): bool {
        return $this->workstations->isEmpty();
    }
}
