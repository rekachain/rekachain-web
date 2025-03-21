<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Support\Enums\PermissionEnum;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $permissions = PermissionEnum::cases();

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission->value]);
        }
    }
}
