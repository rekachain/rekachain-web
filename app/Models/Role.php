<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole {
    protected $fillable = [
        'name',
        'guard_name',
        'division_id',
        'level',
    ];

    public function division(): BelongsTo {
        return $this->belongsTo(Division::class);
    }

    public function users(): MorphToMany {
        return $this->morphedByMany(
            User::class,
            'model',
            config('permission.table_names.model_has_roles'),
            'role_id',
            config('permission.column_names.model_morph_key')
        );
    }
}
