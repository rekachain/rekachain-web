<?php

use App\Http\Controllers\PanelController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'test-', 'as' => 'test-'], function () {
    Route::resource('panels', PanelController::class);
});

Route::get('test', function () {})->name('test');
