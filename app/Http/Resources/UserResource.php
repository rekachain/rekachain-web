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

        $role = $this->whenLoaded('roles', function () {
            return $this->roles->first();  // Accessing the first role if loaded
        }, null);  // Return null if roles are not loaded

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
            'role' => $role,
            'role_id' => $this->roles()?->first()?->id,
            'workstation_id' => $this->workstation_id,
            'step_id' => $this->step_id,
            'workstation' => WorkstationResource::make($this->whenLoaded('workstation')),
            'step' => StepResource::make($this->whenLoaded('step')),
            'can_be_deleted' => $this->canBeDeleted(),
            'is_trashed' => $this->trashed(), // determine if the user is trashed (i.e. soft deleted)
            'projects' => ProjectResource::collection($this->whenLoaded('projects')),
            'has_project' => $this->hasProject(),
        ];
    }
}
