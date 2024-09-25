<?php

use App\Http\Controllers\CarriageController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\TrainsetController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'test', 'as' => 'test'], function () {
    Route::get('/', function () {
        return \App\Models\CarriagePanel::with('carriage_panel_components')->get();
    });

    Route::group(['as' => '.'], function () {
        Route::resource('panels', PanelController::class);
        Route::resource('carriages', CarriageController::class);
        Route::resource('trainsets', TrainsetController::class);
        Route::resource('components', ComponentController::class);
        Route::resource('progress', ProgressController::class);
        Route::resource('steps', StepController::class);
    });
});
