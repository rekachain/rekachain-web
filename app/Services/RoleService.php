<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\RoleRepositoryInterface;
use App\Support\Interfaces\Services\RoleServiceInterface;
use Illuminate\Database\Eloquent\Model;

class RoleService extends BaseCrudService implements RoleServiceInterface {
    public function update($keyOrModel, array $data): ?Model {
        if (isset($data['permissions'])) {
            $keyOrModel->permissions()->sync($data['permissions']);
            app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
        }

        return $this->repository->forceUpdate($keyOrModel, $data);
    }

    protected function getRepositoryClass(): string {
        return RoleRepositoryInterface::class;
    }
}
