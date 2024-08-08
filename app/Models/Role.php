<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Permission\Models\Role as SpatieRole;
/**
 * @OA\Schema(
 *    schema="Role",
 *    type="object",
 *    title="Role",
 *    description="Role details",
 *    @OA\Property(
 *      property="id",
 *      type="integer",
 *      example=1
 *    ),
 *    @OA\Property(
 *      property="name",
 *      type="string",
 *      example="Admin"
 *    ),
 *    @OA\Property(
 *      property="guard_name",
 *      type="string",
 *      example="web"
 *    ),
 *    @OA\Property(
 *      property="division_id",
 *      type="integer",
 *      example=1
 *    ),
 *    @OA\Property(
 *      property="level",
 *      type="integer",
 *      example=1
 *    )
 * )
 */
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
