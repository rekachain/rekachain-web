<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Role;
use App\Support\Interfaces\RoleRepositoryInterface;
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

    protected function getModelClass(): string {
        return Role::class;
    }
}
