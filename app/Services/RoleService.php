<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\RoleRepositoryInterface;
use App\Support\Interfaces\Services\RoleServiceInterface;
use Illuminate\Database\Eloquent\Model;

class RoleService extends BaseCrudService implements RoleServiceInterface {
    public function update($keyOrModel, array $data): ?Model {
        if (isset($data['permissions'])) {
            $keyOrModel->permissions()->sync($data['permissions']);
            app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
        }

        return parent::update($keyOrModel, $data);
    }

    protected function getRepositoryClass(): string {
        return RoleRepositoryInterface::class;
    }
}
