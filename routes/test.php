<?php

use App\Http\Controllers\PanelController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'test', 'as' => 'test'], function () {
    Route::get('/', fn () => 'test');

    Route::group(['as' => '.'], function () {
        Route::resource('panels', PanelController::class);
    });
});
