<?php

use App\Http\Controllers\CarriageController;
use App\Http\Controllers\CarriagePanelComponentController;
use App\Http\Controllers\CarriagePanelController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\TrainsetController;
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
        Route::post('/projects/upload-project', [ProjectController::class, 'store'])->name('projects.upload-project');
        Route::post('/carriage-panels/{carriage_panel}/upload-panel-progress-material', [CarriagePanelController::class, 'update'])->name('carriage-panels.upload-progress-material');
        Route::post('/carriage-panel-components/{carriage_panel_component}/upload-component-progress-material', [CarriagePanelComponentController::class, 'update'])->name('carriage-panel-components.upload-progress-material');
        Route::resource('panels', PanelController::class);
        Route::resource('carriages', CarriageController::class);
        Route::resource('panel-attachments', \App\Http\Controllers\PanelAttachmentController::class);
        Route::resource('trainsets', TrainsetController::class);
        Route::resource('components', ComponentController::class);
        Route::resource('progress', ProgressController::class);
        Route::resource('steps', StepController::class);
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
