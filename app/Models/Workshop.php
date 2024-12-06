<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workshop extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'name',
        'address',
    ];

    protected $filterable = [
        'searchs' => [
            'name',
            'address',
        ],
    ];

    public function workstations(): HasMany {
        return $this->hasMany(Workstation::class);
    }

    public function canBeDeleted(): bool {
        return $this->workstations->isEmpty();
    }
}
