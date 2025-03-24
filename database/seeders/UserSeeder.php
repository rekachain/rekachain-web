<?php

namespace Database\Seeders;

use App\Models\Step;
use App\Models\User;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('step');
        $csvData = $csvReader->getCsvData();

        if (!$csvData) {
            $steps = range(1, 10);
            $workerMekanikSteps = $workerElektrikSteps = $workerAssemblySteps = $qcMekanikSteps = $qcElektrikSteps = $qcAssemblySteps = $steps;
        } else {
            $workerMekanikSteps = [3, 4, 6, 8, 9, 11];
            $workerElektrikSteps = [13, 14, 15];
            $workerAssemblySteps = [19, 20];
            $qcMekanikSteps = [5, 7, 10, 12];
            $qcElektrikSteps = [16];
            $qcAssemblySteps = [21, 22, 23];
        }

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
            'workstation_id' => 1,
        ]);

        $ppcPerencanaan->assignRole('PPC - Perencanaan');

        $ppcPengendalian = User::factory()->create([
            'name' => 'PPC Pengendalian',
            'email' => 'user3@example.com',
            'nip' => '3',
            'workstation_id' => 1,
        ]);

        $ppcPengendalian->assignRole('PPC - Pengendalian');

        $supervisorMekanik = User::factory()->create([
            'name' => 'Supervisor Mekanik',
            'email' => 'user4@example.com',
            'nip' => '4',
            'workstation_id' => 1,
        ]);

        $supervisorMekanik->assignRole('Supervisor - Mekanik');

        $supervisorElektrik = User::factory()->create([
            'name' => 'Supervisor Elektrik',
            'email' => 'user5@example.com',
            'nip' => '5',
            'workstation_id' => 1,
        ]);

        $supervisorElektrik->assignRole('Supervisor - Elektrik');

        $supervisorAssembly = User::factory()->create([
            'name' => 'Supervisor Assembly',
            'email' => 'user6@example.com',
            'nip' => '6',
            'workstation_id' => 1,
        ]);

        $supervisorAssembly->assignRole('Supervisor - Assembly');

        $mekanik = User::factory()->create([
            'name' => 'Mekanik',
            'email' => 'user7@example.com',
            'nip' => '7',
            'workstation_id' => 1,
            'step_id' => Step::whereIn('id', $workerMekanikSteps)->inRandomOrder()->first()->id,
        ]);

        $mekanik->assignRole('Worker - Mekanik');

        $elektrik = User::factory()->create([
            'name' => 'Elektrik',
            'email' => 'user8@example.com',
            'nip' => '8',
            'workstation_id' => 1,
            'step_id' => Step::whereIn('id', $workerElektrikSteps)->inRandomOrder()->first()->id,
        ]);

        $elektrik->assignRole('Worker - Elektrik');

        $assembly = User::factory()->create([
            'name' => 'Assembly',
            'email' => 'user9@example.com',
            'nip' => '9',
            'workstation_id' => 1,
            'step_id' => Step::whereIn('id', $workerAssemblySteps)->inRandomOrder()->first()->id,
        ]);

        $assembly->assignRole('Worker - Assembly');

        $qcMekanik = User::factory()->create([
            'name' => 'QC Mekanik',
            'email' => 'user10@example.com',
            'nip' => '10',
            'workstation_id' => 1,
            'step_id' => Step::whereIn('id', $qcMekanikSteps)->inRandomOrder()->first()->id,
        ]);

        $qcMekanik->assignRole('QC - Mekanik');

        $qcElektrik = User::factory()->create([
            'name' => 'QC Elektrik',
            'email' => 'user11@example.com',
            'nip' => '11',
            'workstation_id' => 1,
            'step_id' => Step::whereIn('id', $qcElektrikSteps)->inRandomOrder()->first()->id,
        ]);

        $qcElektrik->assignRole('QC - Elektrik');

        $qcAssembly = User::factory()->create([
            'name' => 'QC Assembly',
            'email' => 'user12@example.com',
            'nip' => '12',
            'workstation_id' => 1,
            'step_id' => Step::whereIn('id', $qcAssemblySteps)->inRandomOrder()->first()->id,
        ]);

        $qcAssembly->assignRole('QC - Assembly');

        foreach ($workerMekanikSteps as $step) {
            User::factory(rand(1, 5))->create()->each(function ($user) use ($step) {
                $user->assignRole('Worker - Mekanik');
                $user->update(['step_id' => $step]);
            });
        }
        foreach ($workerElektrikSteps as $step) {
            User::factory(rand(1, 5))->create()->each(function ($user) use ($step) {
                $user->assignRole('Worker - Elektrik');
                $user->update(['step_id' => $step]);
            });
        }
        foreach ($workerAssemblySteps as $step) {
            User::factory(rand(1, 5))->create()->each(function ($user) use ($step) {
                $user->assignRole('Worker - Assembly');
                $user->update(['step_id' => $step]);
            });
        }
        foreach ($qcMekanikSteps as $step) {
            User::factory(rand(1, 3))->create()->each(function ($user) use ($step) {
                $user->assignRole('QC - Mekanik');
                $user->update(['step_id' => $step]);
            });
        }
        foreach ($qcElektrikSteps as $step) {
            User::factory(rand(1, 3))->create()->each(function ($user) use ($step) {
                $user->assignRole('QC - Elektrik');
                $user->update(['step_id' => $step]);
            });
        }
        foreach ($qcAssemblySteps as $step) {
            User::factory(rand(1, 3))->create()->each(function ($user) use ($step) {
                $user->assignRole('QC - Assembly');
                $user->update(['step_id' => $step]);
            });
        }

        $supervisorAftersales = User::factory()->create([
            'name' => 'Supervisor Aftersales',
            'email' => 'supervisor.aftersales@example.com',
        ]);

        $supervisorAftersales->assignRole('Supervisor - Aftersales');

        $aftersales = User::factory()->create([
            'name' => 'Aftersales IV',
            'email' => 'aftersales@example.com',
        ]);

        $aftersales->assignRole('Worker - Aftersales');

    }
}
