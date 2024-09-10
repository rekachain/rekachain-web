<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $this->call([
            DivisionSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            ProjectSeeder::class,
            CarriageSeeder::class,
            PresetTrainsetSeeder::class,
            CarriagePresetSeeder::class,
            TrainsetSeeder::class,
            CarriageTrainsetsSeeder::class,
            WorkshopSeeder::class,
            WorkstationSeeder::class,
            ProgressSeeder::class,
            RawMaterialSeeder::class,
            StepSeeder::class,
            PanelSeeder::class,
            CarriagePanelSeeder::class,
            ComponentSeeder::class,
            WorkDaySeeder::class,
            WorkDayTimeSeeder::class,
            CarriagePanelComponentSeeder::class,
            PanelMaterialSeeder::class,
            PanelAttachmentSeeder::class,
            PanelAttachmentHandlerSeeder::class,
            SerialPanelSeeder::class,
            DetailWorkerPanelSeeder::class,
        ]);
    }
}