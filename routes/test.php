<?php

use App\Http\Controllers\CarriageController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\TrainsetController;
use App\Models\CarriagePanel;
use App\Models\CarriagePanelComponent;
use App\Models\CarriageTrainset;
use Illuminate\Support\Facades\Route;

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
        Route::resource('panels', PanelController::class);
        Route::resource('carriages', CarriageController::class);
        Route::resource('panel-attachments', \App\Http\Controllers\PanelAttachmentController::class);
        Route::resource('trainsets', TrainsetController::class);
        Route::resource('components', ComponentController::class);
        Route::resource('progress', ProgressController::class);
        Route::resource('steps', StepController::class);
    });
});
