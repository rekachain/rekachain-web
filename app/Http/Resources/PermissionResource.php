<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'group' => $this->group,
            'guard_name' => $this->guard_name,
            'description' => $this->description,
        ];
    }

    /**
     * Transform the grouped collection into an array.
     *
     * @param  \Illuminate\Support\Collection  $permissions
     * @return array<string, mixed>
     */
    public static function collectionGrouped($permissions): array {
        // Group the permissions by 'group' attribute
        $groupedPermissions = $permissions->groupBy('group');

        $result = [];

        foreach ($groupedPermissions as $group => $permissions) {
            $result[] = [
                'group' => $group,
                'permissions' => self::collection($permissions)->toArray(request()),
            ];
        }

        return $result;
    }
}
