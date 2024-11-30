<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        $isProduction = true;

        if (app()->isProduction() || $isProduction) {
            $this->initializeProductionData();

            return;
        }

        $this->call([
            WorkshopSeeder::class,
            DivisionSeeder::class,
            WorkstationSeeder::class,
            WorkAspectSeeder::class,
            ProgressSeeder::class,
            StepSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            ProjectSeeder::class,
            CarriageSeeder::class,
            PresetTrainsetSeeder::class,
            CarriagePresetSeeder::class,
            TrainsetSeeder::class,
            CarriageTrainsetsSeeder::class,
            ProgressStepSeeder::class,
            RawMaterialSeeder::class,
            PanelSeeder::class,
            CarriagePanelSeeder::class,
            ComponentSeeder::class,
            WorkDaySeeder::class,
            WorkDayTimeSeeder::class,
            CarriagePanelComponentSeeder::class,
            ComponentMaterialSeeder::class,
            PanelMaterialSeeder::class,
            TrainsetAttachmentSeeder::class,
            TrainsetAttachmentComponentSeeder::class,
            DetailWorkerTrainsetSeeder::class,
            TrainsetAttachmentHandlerSeeder::class,
            PanelAttachmentSeeder::class,
            SerialPanelSeeder::class,
            DetailWorkerPanelSeeder::class,
            PanelAttachmentHandlerSeeder::class,
            FeedbackSeeder::class,
            HelpdeskContactSeeder::class,
        ]);
    }

    private function initializeProductionData(): void {
        $this->call([
            DivisionSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,

            // Optional, but required 🗿
            WorkDaySeeder::class,
            WorkDayTimeSeeder::class,
        ]);

        $this->createSuperAdmin();
    }

    private function createSuperAdmin(): void {
        $superadmin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@rekaindo.com',
            'nip' => null,
        ]);

        $superadmin->assignRole('Super Admin');
    }
}
