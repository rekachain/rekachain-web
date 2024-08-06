<?php

namespace Database\Seeders;

use App\Support\Enums\PermissionEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $groupedPermissions = PermissionEnum::groupByFirstWord();

        foreach ($groupedPermissions as $group => $permissions) {
            foreach ($permissions as $permission) {
                Permission::create(['name' => $permission, 'group' => $group]);
            }
        }
    }
}
