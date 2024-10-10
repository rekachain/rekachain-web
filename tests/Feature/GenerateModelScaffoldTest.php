<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

function testFileCleanup() {
    // Clean up any generated files before each test
    File::delete(app_path('Models/TestModel.php'));
    File::delete(app_path('Http/Controllers/TestModelController.php'));
    File::delete(app_path('Http/Controllers/Api/ApiTestModelController.php'));
    File::delete(app_path('Http/Requests/TestModel/StoreTestModelRequest.php'));
    File::delete(app_path('Http/Requests/TestModel/UpdateTestModelRequest.php'));
    File::delete(app_path('Http/Resources/TestModelResource.php'));
    File::delete(app_path('Repositories/TestModelRepository.php'));
    File::delete(app_path('Services/TestModelService.php'));
    File::delete(app_path('Support/Interfaces/Repositories/TestModelRepositoryInterface.php'));
    File::delete(app_path('Support/Interfaces/Services/TestModelServiceInterface.php'));
    File::delete(base_path('Tests/Feature/Http/Controllers/TestModelControllerTest.php'));
    File::delete(base_path('Tests/Feature/Http/Controllers/Api/ApiTestModelControllerTest.php'));
    File::delete(database_path('seeders/TestModelSeeder.php'));
    File::delete(database_path('factories/TestModelFactory.php'));

    // Delete migration files matching the pattern
    $migrationFiles = File::glob(database_path('migrations/*_create_test_models_table.php'));
    foreach ($migrationFiles as $file) {
        File::delete($file);
    }
}

beforeEach(function () {
    testFileCleanup();
});

afterAll(function () {
    testFileCleanup();
});

it('can generate a model scaffold without seeder and factory', function () {
    Artisan::call('make:scaffold', ['model' => 'TestModel', '--controller' => true]);

    expect(File::exists(app_path('Models/TestModel.php')))->toBeTrue()
        ->and(File::exists(app_path('Http/Controllers/TestModelController.php')))->toBeTrue()
        ->and(File::exists(app_path('Http/Requests/TestModel/StoreTestModelRequest.php')))->toBeTrue()
        ->and(File::exists(app_path('Http/Requests/TestModel/UpdateTestModelRequest.php')))->toBeTrue()
        ->and(File::exists(app_path('Http/Resources/TestModelResource.php')))->toBeTrue()
        ->and(File::exists(app_path('Repositories/TestModelRepository.php')))->toBeTrue()
        ->and(File::exists(app_path('Services/TestModelService.php')))->toBeTrue()
        ->and(File::exists(app_path('Support/Interfaces/Repositories/TestModelRepositoryInterface.php')))->toBeTrue()
        ->and(File::exists(app_path('Support/Interfaces/Services/TestModelServiceInterface.php')))->toBeTrue();
});

it('can generate a model scaffold with seeder', function () {
    Artisan::call('make:scaffold', ['model' => 'TestModel', '--seeder' => true]);

    expect(File::exists(app_path('Models/TestModel.php')))->toBeTrue()
        ->and(File::exists(database_path('seeders/TestModelSeeder.php')))->toBeTrue();
});

it('can generate a model scaffold with factory', function () {
    Artisan::call('make:scaffold', ['model' => 'TestModel', '--factory' => true]);

    expect(File::exists(app_path('Models/TestModel.php')))->toBeTrue()
        ->and(File::exists(database_path('factories/TestModelFactory.php')))->toBeTrue();
});

it('can generate a model scaffold with seeder and factory', function () {
    Artisan::call('make:scaffold', ['model' => 'TestModel', '--seeder' => true, '--factory' => true]);

    expect(File::exists(app_path('Models/TestModel.php')))->toBeTrue()
        ->and(File::exists(database_path('seeders/TestModelSeeder.php')))->toBeTrue()
        ->and(File::exists(database_path('factories/TestModelFactory.php')))->toBeTrue();
});
