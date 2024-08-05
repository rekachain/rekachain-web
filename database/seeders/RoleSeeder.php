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
            ['name' => 'Supervisor - Mekanik', 'division' => 'Mekanik', 'level' => 'Supervisor'],
            ['name' => 'Supervisor - Elektrik', 'division' => 'Elektrik', 'level' => 'Supervisor'],
            ['name' => 'Supervisor - Assembly', 'division' => 'Assembly', 'level' => 'Supervisor'],
            ['name' => 'Worker - Mekanik', 'division' => 'Mekanik', 'level' => 'Worker'],
            ['name' => 'Worker - Elektrik', 'division' => 'Elektrik', 'level' => 'Worker'],
            ['name' => 'Worker - Assembly', 'division' => 'Assembly', 'level' => 'Worker'],
            ['name' => 'QC - Mekanik', 'division' => 'Mekanik', 'level' => 'QC'],
            ['name' => 'QC - Elektrik', 'division' => 'Elektrik', 'level' => 'QC'],
            ['name' => 'QC - Assembly', 'division' => 'Assembly', 'level' => 'QC'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
