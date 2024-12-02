<?php

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\CarriagePanel;
use App\Models\CarriageTrainset;
use Illuminate\Support\Facades\Route;
use App\Models\CarriagePanelComponent;
use App\Http\Controllers\StepController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CarriageController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TrainsetController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\WorkAspectController;
use App\Http\Controllers\CarriagePanelController;
use App\Http\Controllers\PanelAttachmentController;
use App\Http\Controllers\TrainsetAttachmentController;
use App\Http\Controllers\CarriagePanelComponentController;

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

Route::get('/total-estimated-time/{project_id?}/{trainset_id?}', function ($project_id = null, $trainset_id = null) {
    $mechanicTime = 0;
    $electricalTime = 0;
    $assemblyTime = 0;

    if ($trainset_id) {
        $trainset = \App\Models\Trainset::with(['carriage_trainsets' => [
            'carriage_panels' => [
                'progress.steps'
            ]
        ]])->findOrFail($trainset_id);

        foreach ($trainset->carriage_trainsets as $carriageTrainset) {
            foreach ($carriageTrainset->carriage_panels as $carriagePanel) {
                $stepTime = 0;
                foreach ($carriagePanel->progress->steps as $step) {
                    $stepTime = $step->estimated_time * $carriagePanel->qty * $carriageTrainset->qty;
                }

                switch($carriagePanel->progress->work_aspect_id) {
                    case 1: // Mechanic
                        $mechanicTime += $stepTime;
                        break;
                    case 2: // Electric
                        $electricalTime += $stepTime;
                        break;
                    case 3: // Assembly
                        $assemblyTime += $stepTime;
                        break;
                }

                foreach($carriagePanel->carriage_panel_components as $component) {
                    $componentStepTime = 0;
                    foreach ($component->progress->steps as $step) {
                        $componentStepTime = $step->estimated_time * $component->qty * $carriagePanel->qty * $carriageTrainset->qty;
                    }

                    switch($component->progress->work_aspect_id) {
                        case 1: // Mechanic
                            $mechanicTime += $componentStepTime;
                            break;
                        case 2: // Electric
                            $electricalTime += $componentStepTime;
                            break;
                        case 3: // Assembly
                            $assemblyTime += $componentStepTime;
                            break;
                    }
                }
            }
        }

        $totalTime = max($mechanicTime, $electricalTime) + $assemblyTime;

        $minutesPerWorkingDay = 8 * 60; // 8 hours * 60 minutes
        $totalWorkingDays = ceil($totalTime / $minutesPerWorkingDay);

        // Get project start date
        $startDate = $project->initial_date; // Assuming you have initial_date in your Project model
        $endDate = Carbon::parse($startDate);

        // Add working days considering only Monday-Friday
        for ($i = 0; $i < $totalWorkingDays; $i++) {
            $endDate->addDay();
            // Skip weekends
            while ($endDate->isWeekend()) {
                $endDate->addDay();
            }
        }

        return response()->json([
            'trainset_id' => $trainset_id,
            'mechanical_time' => $mechanicTime,
            'electrical_time' => $electricalTime,
            'assembly_time' => $assemblyTime,
            'total_estimated_time' => $totalTime,
            'total_working_days' => $totalWorkingDays,
            'initial_date' => $startDate,
            'estimated_end_date' => $endDate->format('Y-m-d')
        ]);
    }

    if ($project_id) {
        $project = \App\Models\Project::with(['trainsets.carriage_trainsets' => [
            'carriage_panels' => [
                'progress.steps'
            ]
        ]])->findOrFail($project_id);

        foreach ($project->trainsets as $trainset) {
            foreach ($trainset->carriage_trainsets as $carriageTrainset) {
                foreach ($carriageTrainset->carriage_panels as $carriagePanel) {
                    $stepTime = 0;
                    foreach ($carriagePanel->progress->steps as $step) {
                        $stepTime = $step->estimated_time * $carriagePanel->qty * $carriageTrainset->qty;
                    }

                    switch($carriagePanel->progress->work_aspect_id) {
                        case 1: // Mechanic
                            $mechanicTime += $stepTime;
                            break;
                        case 2: // Electric
                            $electricalTime += $stepTime;
                            break;
                        case 3: // Assembly
                            $assemblyTime += $stepTime;
                            break;
                    }

                    foreach ($carriagePanel->carriage_panel_components as $component) {
                        $componentStepTime = 0;
                        foreach ($component->progress->steps as $step) {
                            $componentStepTime = $step->estimated_time * $component->qty * $carriagePanel->qty * $carriageTrainset->qty;
                        }

                        switch ($component->progress->work_aspect_id) {
                            case 1: // Mechanic
                                $mechanicTime += $componentStepTime;
                                break;
                            case 2: // Electric
                                $electricalTime += $componentStepTime;
                                break;
                            case 3: // Assembly
                                $assemblyTime += $componentStepTime;
                                break;
                        }
                    }
                }
            }
        }

        $totalTime = max($mechanicTime, $electricalTime) + $assemblyTime;

        $minutesPerWorkingDay = 8 * 60; // 8 hours * 60 minutes
        $totalWorkingDays = ceil($totalTime / $minutesPerWorkingDay);

        // Get project start date
        $startDate = $project->initial_date; // Assuming you have initial_date in your Project model
        $endDate = Carbon::parse($startDate);

        // Add working days considering only Monday-Friday
        for ($i = 0; $i < $totalWorkingDays; $i++) {
            $endDate->addDay();
            // Skip weekends
            while ($endDate->isWeekend()) {
                $endDate->addDay();
            }
        }

        return response()->json([
            'project_id' => $project_id,
            'mechanical_time' => $mechanicTime,
            'electrical_time' => $electricalTime,
            'assembly_time' => $assemblyTime,
            'total_estimated_time' => $totalTime,
            'total_working_days' => $totalWorkingDays,
            'initial_date' => $startDate,
            'estimated_end_date' => $endDate->format('Y-m-d')
        ]);
    }

    return response()->json(['message' => 'Please provide project_id or trainset_id']);
})->name('estimated-time');
