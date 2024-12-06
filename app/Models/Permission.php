<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission {
    use HasFilterable;
    protected $fillable = [
        'name',
        'guard_name',
        'group',
    ];

    protected $filterable = [
        'searchs' => [
            'name',
            'group',
        ],
    ];
}
