<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource {
    /**
     * @OA\Schema(
     *     schema="RoleResource",
     *     type="object",
     *     description="Role resource",
     *     allOf={
     *      @OA\Schema(ref="#/components/schemas/Role")
     *     }
     * )
     *
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'division_id' => $this->division_id,
            'guard_name' => $this->guard_name,
            'division' => $this->division?->name,
            'level' => $this->level,
            'users_count' => $this->users()->count(),
            'permissions_count' => $this->permissions()->count(),
            'permissions' => $request->routeIs('roles.edit')
                ? PermissionResource::collection($this->permissions)->pluck('id')
                : null,
        ];
    }
}
