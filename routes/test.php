<?php

use App\Http\Controllers\CarriageController;
use App\Http\Controllers\CarriagePanelComponentController;
use App\Http\Controllers\CarriagePanelController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\PanelAttachmentController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\TrainsetAttachmentController;
use App\Http\Controllers\TrainsetController;
use App\Http\Controllers\WorkAspectController;
use App\Models\CarriagePanel;
use App\Models\CarriagePanelComponent;
use App\Models\CarriageTrainset;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['prefix' => 'test', 'as' => 'test'], function () {
    Route::get('/', function (\App\Support\Interfaces\Services\CarriageTrainsetServiceInterface $carriageTrainsetService, \App\Support\Interfaces\Services\TrainsetServiceInterface $trainsetService) {
        $trainset = $trainsetService->with(['carriage_trainsets' => ['carriage_panels' => ['carriage_panel_components']]])->findOrFail(1);

        $componentQuantities = collect();

        /** @var \App\Models\Trainset $trainset */
        $trainset->carriage_trainsets->each(function (CarriageTrainset $carriageTrainset) use (&$componentQuantities) {
            $carriageTrainset->carriage_panels->each(function (CarriagePanel $carriagePanel) use ($carriageTrainset, &$componentQuantities) {
                $carriagePanel->carriage_panel_components->each(function (CarriagePanelComponent $component) use ($carriageTrainset, $carriagePanel, &$componentQuantities) {
                    $totalQty = $carriageTrainset->qty * $carriagePanel->qty * $component->qty;
                    $componentQuantities->push([
                        'component_id' => $component->component_id,
                        'component' => \App\Http\Resources\ComponentResource::make($component->component),
                        'total_qty' => $totalQty,
                    ]);
                });
            });
        });
        $mergedComponents = $componentQuantities->groupBy('component_id')->map(function ($group) {
            return [
                'component_id' => $group->first()['component_id'],
                'component' => $group->first()['component'],
                'total_qty' => $group->sum('total_qty'),
            ];
        })->values();

        return $mergedComponents;
    });

    Route::group(['as' => '.'], function () {
        Route::resource('projects', ProjectController::class);
        Route::resource('panels', PanelController::class);
        Route::resource('carriages', CarriageController::class);
        Route::resource('carriage-panels', CarriagePanelController::class);
        Route::resource('trainset-attachments', TrainsetAttachmentController::class);
        Route::resource('panel-attachments', PanelAttachmentController::class);
        Route::resource('trainsets', TrainsetController::class);
        Route::resource('components', ComponentController::class);
        Route::resource('carriage-panel-components', CarriagePanelComponentController::class);
        Route::resource('progress', ProgressController::class);
        Route::resource('steps', StepController::class);
        Route::resource('work-aspects', WorkAspectController::class);
        Route::controller(ProjectController::class)->group(function () {
            Route::get('/projects/{project}/carriages/{carriage}', 'project_carriage')->name('projects.carriages.show');
            Route::put('/projects/{project}/carriages/{carriage}', 'project_carriage')->name('projects.carriages.update');
            Route::get('/projects/{project}/trainsets/{trainset}', 'project_trainset')->name('projects.trainsets.index');
            Route::put('/projects/{project}/trainsets/{trainset}', 'project_trainset')->name('projects.trainsets.update');
        });
    });
    Route::get('csrf-token', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    })->name('csrf-token');
});

Route::get('/buat-proyek', function () {
    return Inertia::render('CreateProject/CreateProject');
})->middleware(['auth', 'verified'])->name('buat-proyek');
Route::get('/buat-trainset', function () {
    return Inertia::render('CreateProject/DetailTrainset');
})->middleware(['auth', 'verified'])->name('buat-trainset');

Route::get('/proyek', function () {
    return Inertia::render('ProjectList');
})->middleware(['auth', 'verified'])->name('proyek');
Route::get('/list-trainset', function () {
    return Inertia::render('CreateProject/CreateTrainset');
})->middleware(['auth', 'verified'])->name('list-trainset');
Route::get('/buat-kpm', function () {
    return Inertia::render('CreateProject/CreateKPM');
})->middleware(['auth', 'verified'])->name('buat-kpm');
Route::get('/detail-proyek/{id}', function ($detail_proyek) {
    return Inertia::render('Detail/DetailProject', ['detail' => $detail_proyek]);
})->middleware(['auth', 'verified'])->name('detail-proyek');
Route::get('/{noProyek}/detail-ts/{id}', function ($detail_proyek, $detail_ts) {
    return Inertia::render('Detail/DetailTS', ['detailTS' => $detail_ts, 'noProyek' => $detail_proyek]);
})->middleware(['auth', 'verified'])->name('detail-ts');
Route::get('/{noProyek}/{kodeTS}/detail-kereta/{id}', function ($detail_proyek, $detail_ts, $detail_kereta) {
    return Inertia::render('Detail/DetailKereta', ['detailTS' => $detail_ts, 'noProyek' => $detail_proyek, 'susunanKereta' => $detail_kereta]);
})->middleware(['auth', 'verified'])->name('detail-kereta');
