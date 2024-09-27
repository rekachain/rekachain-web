<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        $superadmin = User::factory()->create([
            'name' => 'Test User',
            'email' => 'user1@example.com',
            'nip' => '1',
        ]);

        $superadmin->assignRole('Super Admin');

        $ppcPerencanaan = User::factory()->create([
            'name' => 'PPC Perencanaan',
            'email' => 'user2@example.com',
            'nip' => '2',
        ]);

        $ppcPerencanaan->assignRole('PPC - Perencanaan');

        $ppcPengendalian = User::factory()->create([
            'name' => 'PPC Pengendalian',
            'email' => 'user3@example.com',
            'nip' => '3',
        ]);

        $ppcPengendalian->assignRole('PPC - Pengendalian');

        $supervisorMekanik = User::factory()->create([
            'name' => 'Supervisor Mekanik',
            'email' => 'user4@example.com',
            'nip' => '4',
        ]);

        $supervisorMekanik->assignRole('Supervisor - Mekanik');

        $supervisorElektrik = User::factory()->create([
            'name' => 'Supervisor Elektrik',
            'email' => 'user5@example.com',
            'nip' => '5',
        ]);

        $supervisorElektrik->assignRole('Supervisor - Elektrik');

        $supervisorAssembly = User::factory()->create([
            'name' => 'Supervisor Assembly',
            'email' => 'user6@example.com',
            'nip' => '6',
        ]);

        $supervisorAssembly->assignRole('Supervisor - Assembly');

        $mekanik = User::factory()->create([
            'name' => 'Mekanik',
            'email' => 'user7@example.com',
            'nip' => '7',
        ]);

        $mekanik->assignRole('Worker - Mekanik');
        
        $elektrik = User::factory()->create([
            'name' => 'Elektrik',
            'email' => 'user8@example.com',
            'nip' => '8',
        ]);

        $elektrik->assignRole('Worker - Elektrik');

        $assembly = User::factory()->create([
            'name' => 'Assembly',
            'email' => 'user9@example.com',
            'nip' => '9',
        ]);

        $assembly->assignRole('Worker - Assembly');

        $qcMekanik = User::factory()->create([
            'name' => 'QC Mekanik',
            'email' => 'user10@example.com',
            'nip' => '10',
        ]);

        $qcMekanik->assignRole('QC - Mekanik');

        $qcElektrik = User::factory()->create([
            'name' => 'QC Elektrik',
            'email' => 'user11@example.com',
            'nip' => '11',
        ]);

        $qcElektrik->assignRole('QC - Elektrik');

        $qcAssembly = User::factory()->create([
            'name' => 'QC Assembly',
            'email' => 'user12@example.com',
            'nip' => '12',
        ]);

        $qcAssembly->assignRole('QC - Assembly');

        User::factory(10)->create()->each(fn ($user) => $user->assignRole('Worker - Mekanik'));
        User::factory(10)->create()->each(fn ($user) => $user->assignRole('Worker - Elektrik'));
        User::factory(10)->create()->each(fn ($user) => $user->assignRole('Worker - Assembly'));
        User::factory(10)->create()->each(fn ($user) => $user->assignRole('QC - Mekanik'));
        User::factory(10)->create()->each(fn ($user) => $user->assignRole('QC - Elektrik'));
        User::factory(10)->create()->each(fn ($user) => $user->assignRole('QC - Assembly'));

    }
}
