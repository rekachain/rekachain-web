<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Database\Seeders\ComponentMaterialSeeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $this->call([
            WorkshopSeeder::class,
            DivisionSeeder::class,
            WorkstationSeeder::class,
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
            // ComponentMaterialSeeder::class,
            PanelMaterialSeeder::class,
            PanelAttachmentSeeder::class,
            PanelAttachmentHandlerSeeder::class,
            SerialPanelSeeder::class,
            DetailWorkerPanelSeeder::class,
            TrainsetAttachmentSeeder::class,
            DetailWorkerTrainsetSeeder::class,
        ]);
    }
}
