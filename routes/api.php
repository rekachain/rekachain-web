<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiCarriageController;
use App\Http\Controllers\Api\ApiComponentController;
use App\Http\Controllers\Api\ApiDetailWorkerPanelController;
use App\Http\Controllers\Api\ApiDetailWorkerTrainsetController;
use App\Http\Controllers\Api\ApiPanelAttachmentController;
use App\Http\Controllers\Api\ApiPanelAttachmentHandlerController;
use App\Http\Controllers\Api\ApiPanelController;
use App\Http\Controllers\Api\ApiPanelMaterialController;
use App\Http\Controllers\Api\ApiProgressController;
use App\Http\Controllers\Api\ApiProjectController;
use App\Http\Controllers\Api\ApiSerialPanelController;
use App\Http\Controllers\Api\ApiTrainsetAttachmentController;
use App\Http\Controllers\Api\ApiTrainsetAttachmentHandlerController;
use App\Http\Controllers\Api\ApiTrainsetController;
use App\Http\Controllers\Api\ApiUserController;
use App\Http\Controllers\Api\ApiWorkDayController;
use App\Http\Controllers\Api\ApiWorkDayTimeController;
use App\Http\Controllers\FeedbackController;
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
    Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::apiResource('detail-worker-panels', ApiDetailWorkerPanelController::class);
        Route::apiResource('detail-worker-trainsets', ApiDetailWorkerTrainsetController::class);
        Route::apiResource('projects', ApiProjectController::class);
        Route::apiResource('carriages', ApiCarriageController::class);
        Route::apiResource('users', ApiUserController::class);
        Route::apiResource('trainsets', ApiTrainsetController::class);
        Route::apiResource('panels', ApiPanelController::class);
        Route::apiResource('trainset-attachments', ApiTrainsetAttachmentController::class);
        Route::apiResource('trainset-attachment-handlers', ApiTrainsetAttachmentHandlerController::class);
        Route::apiResource('panel-attachments', ApiPanelAttachmentController::class);
        Route::apiResource('panel-attachment-handlers', ApiPanelAttachmentHandlerController::class);
        Route::apiResource('serial-panels', ApiSerialPanelController::class);
        // Route::apiResource('components', ApiComponentController::class)->only(['index', 'show']);
        Route::apiResource('components', ApiComponentController::class);
        // Route::apiResource('progress', ApiProgressController::class)->only(['index', 'show']);
        Route::apiResource('progress', ApiProgressController::class);
        Route::apiResource('panel-materials', ApiPanelMaterialController::class);
        // Route::apiResource('panel-materials', ApiPanelMaterialController::class)->only(['index', 'show']);
        Route::apiResource('work-days', ApiWorkDayController::class);
        Route::apiResource('work-day-times', ApiWorkDayTimeController::class);
        Route::apiResource('feedback', FeedbackController::class)->except(['store']);
        Route::get('logout', [ApiAuthController::class, 'logout'])->name('logout');
    });

});
