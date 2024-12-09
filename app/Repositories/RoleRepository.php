<?php

namespace App\Repositories;

use App\Models\Role;
use App\Support\Interfaces\Repositories\RoleRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface {
    public function create(array $data): ?Model {
        $role = parent::create($data);

        if (isset($data['permissions'])) {
            foreach ($data['permissions'] as $permission) {
                $role->givePermissionTo($permission);
            }
        }

        return $role;
    }

    public function update($keyOrModel, array $data): ?Model {
        if (isset($data['permissions'])) {
            $keyOrModel->permissions()->sync($data['permissions']);
        }

        return $keyOrModel;
    }

    public function forceUpdate(mixed $keyOrModel, array $data): ?Model {
        return Role::find($keyOrModel->id)->update($data) ? Role::find($keyOrModel->id) : null;
    }

    protected function getModelClass(): string {
        return Role::class;
    }
}
