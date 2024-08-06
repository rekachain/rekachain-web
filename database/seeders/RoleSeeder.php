<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $roles = [
            ['name' => 'Super Admin'],
            ['name' => 'PPC - Perencanaan'],
            ['name' => 'PPC - Pengendalian'],
            ['name' => 'Supervisor - Mekanik', 'level' => 'Supervisor', 'division_id' => 1],
            ['name' => 'Supervisor - Elektrik', 'level' => 'Supervisor', 'division_id' => 2],
            ['name' => 'Supervisor - Assembly', 'level' => 'Supervisor', 'division_id' => 3],
            ['name' => 'Worker - Mekanik', 'level' => 'Worker', 'division_id' => 1],
            ['name' => 'Worker - Elektrik', 'level' => 'Worker', 'division_id' => 2],
            ['name' => 'Worker - Assembly', 'level' => 'Worker', 'division_id' => 3],
            ['name' => 'QC - Mekanik', 'level' => 'QC', 'division_id' => 1],
            ['name' => 'QC - Elektrik', 'level' => 'QC', 'division_id' => 2],
            ['name' => 'QC - Assembly', 'level' => 'QC', 'division_id' => 3],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
