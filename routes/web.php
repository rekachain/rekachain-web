<?php

use App\Http\Controllers\CarriageController;
use App\Http\Controllers\CarriagePanelController;
use App\Http\Controllers\CarriagePresetController;
use App\Http\Controllers\CarriageTrainsetController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\ComponentMaterialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetailWorkerPanelController;
use App\Http\Controllers\DetailWorkerTrainsetController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\PanelAttachmentController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PresetTrainsetController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\ProgressStepController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RawMaterialController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\TrainsetAttachmentController;
use App\Http\Controllers\TrainsetController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkAspectController;
use App\Http\Controllers\WorkDayController;
use App\Http\Controllers\WorkDayTimeController;
use App\Http\Controllers\WorkshopController;
use App\Http\Controllers\WorkstationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

if (app()->isLocal()) {
    require __DIR__ . '/test.php';
}

require __DIR__ . '/auth.php';

Route::redirect('/', 'dashboard');
Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

Route::middleware('auth')->group(function () {
    // Route::inertia('/dashboard', 'ProjectList')->middleware(['verified'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // Route::get('/test', function(){
    //     return inertia('Division/Create');
    // } );
    Route::resource('/test',TestController::class);
    
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/{project}', [DashboardController::class, 'show']);
    Route::get('dashboard/{project}/{trainset}', [DashboardController::class, 'trainset']);
    // Route::resource('dashboard', DashboardController::class)->name('dashboard');
    Route::resource('divisions', DivisionController::class);
    Route::resource('workshops', WorkshopController::class);
    Route::resource('workstations', WorkstationController::class);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::resource('projects', ProjectController::class);
    Route::resource('trainsets', TrainsetController::class);
    Route::resource('trainset-attachments', TrainsetAttachmentController::class);
    Route::resource('panel-attachments', PanelAttachmentController::class);
    Route::resource('raw-materials', RawMaterialController::class);
    Route::resource('carriages', CarriageController::class);
    Route::resource('carriage-presets', CarriagePresetController::class);
    Route::resource('preset-trainsets', PresetTrainsetController::class);
    Route::resource('panels', PanelController::class);
    Route::resource('carriage-panels', CarriagePanelController::class);
    Route::resource('progress', ProgressController::class);
    Route::resource('carriage-trainsets', CarriageTrainsetController::class);
    Route::resource('components', ComponentController::class);
    Route::resource('component-materials', ComponentMaterialController::class);
    Route::resource('work-aspects', WorkAspectController::class);
    Route::resource('work-days', WorkDayController::class);
    Route::resource('work-day-times', WorkDayTimeController::class);
    Route::resource('steps', StepController::class);
    Route::resource('progress-steps', ProgressStepController::class);
    Route::resource('panel-attachments', PanelAttachmentController::class);
    Route::resource('detail-worker-panels', DetailWorkerPanelController::class);
    Route::resource('detail-worker-trainsets', DetailWorkerTrainsetController::class);
    Route::resource('feedback', FeedbackController::class)->except(['store']);

    Route::controller(ProjectController::class)->prefix('projects/{project}')->name('projects.')->group(function () {
        Route::get('components', 'project_components')->name('components.index');
        Route::get('panels', 'project_panels')->name('panels.index');
        Route::group(['prefix' => 'carriages', 'as' => 'carriages.'], function () {
            Route::get('/', 'project_carriages')->name('index');
            Route::get('/{carriage}', 'project_carriage')->name('show');
            Route::put('/{carriage}', 'project_carriage')->name('update');
            Route::get('/{carriage}/components', 'project_carriage_components')->name('components.index');
            Route::get('/{carriage}/panels', 'project_carriage_panels')->name('panels.index');
        });
        Route::group(['prefix' => 'trainsets', 'as' => 'trainsets.'], function () {
            Route::get('/', 'project_trainsets')->name('index');
            Route::get('/{trainset}', 'project_trainset')->name('show');
            Route::get('/{trainset}/carriage-trainsets', 'project_trainset_carriageTrainsets')->name('carriage-trainsets.index');
            Route::get('/{trainset}/carriage-trainsets/{carriage_trainset}', 'project_trainset_carriageTrainset')->name('carriage-trainsets.show');
            Route::get('/{trainset}/carriage-trainsets/{carriage_trainset}/panels', 'project_trainset_carriageTrainset_panels')->name('carriage-trainsets.panels.index');
        });
    });
});
