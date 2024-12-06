<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Division extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'name',
    ];

    protected $filterable = [
        'searchs' => ['name'],
    ];

    public function roles(): HasMany {
        return $this->hasMany(Role::class);
    }

    public function workstations(): HasMany {
        return $this->hasMany(Workstation::class);
    }

    public function canBeDeleted(): bool {
        return $this->roles->isEmpty() && $this->workstations->isEmpty();
    }
}
