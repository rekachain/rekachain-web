<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\CarriageController;
use App\Http\Controllers\TrainsetController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\ProgressController;

Route::group(['prefix' => 'test', 'as' => 'test'], function () {
    Route::get('/', fn () => 'test');

    Route::group(['as' => '.'], function () {
        Route::resource('panels', PanelController::class);
        Route::resource('carriages', CarriageController::class);
        Route::resource('trainsets', TrainsetController::class);
        Route::resource('components', ComponentController::class);
        Route::resource('progress', ProgressController::class);
    });
});