<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\CarriageController;

Route::group(['prefix' => 'test', 'as' => 'test'], function () {
    Route::get('/', fn () => 'test');

    Route::group(['as' => '.'], function () {
        Route::resource('panels', PanelController::class);
        Route::resource('carriages', CarriageController::class);
    });
});