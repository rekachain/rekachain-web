<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiCarriageController;
use App\Http\Controllers\Api\ApiProjectController;
use App\Http\Controllers\Api\ApiUserController;
use App\Http\Controllers\Api\ApiTrainsetController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['as' => 'api.'], function () {
    Route::post('login', [ApiAuthController::class, 'login'])->name('login');

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::apiResource('projects', ApiProjectController::class);
        Route::apiResource('carriages', ApiCarriageController::class);
        Route::apiResource('users', ApiUserController::class);
        Route::apiResource('projects', ProjectController::class);
        Route::apiResource('trainsets', ApiTrainsetController::class);
        Route::get('logout', [ApiAuthController::class, 'logout'])->name('logout');
    });


});
