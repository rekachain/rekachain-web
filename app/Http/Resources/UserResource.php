<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
     * @OA\Schema(
     *      schema="UserResource",
     *      type="object",
     *      description="User resource",
     *      allOf={
     *          @OA\Schema(ref="#/components/schemas/User")
     *      }
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
            'nip' => $this->nip,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'image_path' => $this->image_path,
            'image' => $this->image,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // only return the first, and only role
            'role' => new RoleResource($this->whenLoaded('roles')[0]),
            'role_id' => $this->roles()->first()?->id,
        ];
    }
}
