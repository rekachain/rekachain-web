<?php

use App\Http\Controllers\Api\ApiSearchController;
use App\Http\Controllers\CarriageController;
use App\Http\Controllers\CarriagePanelComponentController;
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
use App\Http\Controllers\HelpdeskContactController;
use App\Http\Controllers\PanelAttachmentController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\PanelMaterialController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PresetTrainsetController;
use App\Http\Controllers\ProductProblemController;
use App\Http\Controllers\ProductProblemNoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\ProgressStepController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RawMaterialController;
use App\Http\Controllers\ReplacementStockController;
use App\Http\Controllers\ReturnedProductController;
use App\Http\Controllers\ReturnedProductNoteController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\TrainsetAttachmentController;
use App\Http\Controllers\TrainsetController;
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
    // Route::resource('/test',TestController::class);

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/{project}', [DashboardController::class, 'show']);
    Route::get('dashboard/{project}/{trainset}', [DashboardController::class, 'trainset'])->name('dashboard.trainset');
    // Route::resource('dashboard', DashboardController::class)->name('dashboard');
    Route::resource('divisions', DivisionController::class); // auth done
    Route::resource('workshops', WorkshopController::class); // auth done
    Route::resource('workstations', WorkstationController::class); // auth done
    Route::resource('users', UserController::class); // auth done
    Route::resource('roles', RoleController::class); // auth done
    Route::resource('permissions', PermissionController::class); // auth done
    Route::resource('projects', ProjectController::class); // auth
    Route::resource('trainsets', TrainsetController::class); // auth
    Route::resource('trainset-attachments', TrainsetAttachmentController::class); // auth
    Route::resource('panel-attachments', PanelAttachmentController::class); // auth
    Route::resource('raw-materials', RawMaterialController::class); // auth done
    Route::resource('carriages', CarriageController::class); // auth done
    Route::resource('carriage-presets', CarriagePresetController::class); // auth done
    Route::resource('preset-trainsets', PresetTrainsetController::class); // auth done
    Route::resource('panels', PanelController::class); // auth done
    Route::resource('panel-materials', PanelMaterialController::class);
    Route::resource('carriage-panels', CarriagePanelController::class); // auth
    Route::resource('carriage-panel-components', CarriagePanelComponentController::class);
    Route::resource('progress', ProgressController::class);
    Route::resource('carriage-trainsets', CarriageTrainsetController::class);
    Route::resource('components', ComponentController::class); // auth done
    Route::resource('component-materials', ComponentMaterialController::class);
    Route::resource('work-aspects', WorkAspectController::class);
    Route::resource('work-days', WorkDayController::class); // auth done
    Route::resource('work-day-times', WorkDayTimeController::class); // auth done
    Route::resource('steps', StepController::class); // auth
    Route::resource('progress-steps', ProgressStepController::class);
    Route::resource('panel-attachments', PanelAttachmentController::class);
    Route::resource('detail-worker-panels', DetailWorkerPanelController::class);
    Route::resource('detail-worker-trainsets', DetailWorkerTrainsetController::class);
    Route::resource('feedback', FeedbackController::class)->except(['store']);
    Route::resource('helpdesk-contact', HelpdeskContactController::class);
    Route::resource('returned-products', ReturnedProductController::class);
    Route::resource('returned-product-notes', ReturnedProductNoteController::class);
    Route::resource('product-problems', ProductProblemController::class);
    Route::resource('product-problem-notes', ProductProblemNoteController::class);
    Route::resource('replacement-stocks', ReplacementStockController::class);

    Route::get('/search', [ApiSearchController::class, 'search']);

    // Route::controller(WorkDayController::class)->prefix('work-days/{work_day}')->name('work-days.')->group(function () {
    //     Route::resource('work-day-times', WorkDayTimeController::class)->parameters([
    //         'work_day_times' => 'work_day_time',
    //     ])->except(['show']);
    // });

    Route::resource('work-days.work-day-times', WorkDayTimeController::class)->parameters([
        'work-day-times' => 'work_day_time',
    ])->except(['index', 'show']);

    Route::controller(ProjectController::class)->prefix('projects/{project}')->name('projects.')->group(function () {
        Route::get('components', 'project_components')->name('components.index');
        Route::get('panels', 'project_panels')->name('panels.index');
        Route::get('estimated-time/{trainset?}', 'getEstimatedTime')->name('estimated-time');

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
            Route::put('/{trainset}', 'project_trainset')->name('update');
            Route::get('/{trainset}/components', 'project_trainset_components')->name('components.index');
            Route::get('/{trainset}/panels', 'project_trainset_panels')->name('panels.index');
            Route::get('/{trainset}/carriage-trainsets', 'project_trainset_carriageTrainsets')->name('carriage-trainsets.index');
            Route::get('/{trainset}/carriage-trainsets/{carriage_trainset}', 'project_trainset_carriageTrainset')->name('carriage-trainsets.show');
            Route::get('/{trainset}/carriage-trainsets/{carriage_trainset}/carriage-panels', 'project_trainset_carriageTrainset_carriagePanels')->name('carriage-trainsets.carriage-panels.index');
            Route::get('/{trainset}/carriage-trainsets/{carriage_trainset}/carriage-panels/{carriage_panel}', 'project_trainset_carriageTrainset_carriagePanel')->name('carriage-trainsets.carriage-panels.show');
            Route::get('/{trainset}/carriage-trainsets/{carriage_trainset}/carriage-panels/{carriage_panel}/carriage-panel-components', 'project_trainset_carriageTrainset_carriagePanel_carriagePanelComponents')->name('carriage-trainsets.carriage-panels.carriage-panel-components.index');
            Route::get('/{trainset}/carriage-trainsets/{carriage_trainset}/carriage-panels/{carriage_panel}/carriage-panel-components/{carriage_panel_component}/component-materials', 'project_trainset_carriageTrainset_carriagePanel_carriagePanelComponent_componentMaterials')->name('carriage-trainsets.carriage-panels.carriage-panel-components.component-materials.index');
            Route::get('/{trainset}/carriage-trainsets/{carriage_trainset}/carriage-panels/{carriage_panel}/panel-materials', 'project_trainset_carriageTrainset_carriagePanel_panelMaterials')->name('carriage-trainsets.carriage-panels.panel-materials.index');
        });
    });

    Route::controller(ReturnedProductController::class)->prefix('requested-returns')->name('requested-returns.')->group(function () {
        Route::get('/', 'requested_returns')->name('index');
    });
});
