<?php

use App\Http\Controllers\DivisionController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkshopController;
use App\Http\Controllers\WorkstationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect(route('dashboard'));

    //    return Inertia::render('Welcome', [
    //        'canLogin' => Route::has('login'),
    //        'canRegister' => Route::has('register'),
    //        'laravelVersion' => Application::VERSION,
    //        'phpVersion' => PHP_VERSION,
    //    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('divisions', DivisionController::class);
    Route::resource('workshops', WorkshopController::class);
    Route::resource('workstations', WorkstationController::class);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::resource('projects', ProjectController::class);

    Route::controller(ProjectController::class)->group(function () {
        Route::get('/projects/{project}/trainsets', 'trainsets')->name('projects.trainsets.index');
        Route::get('/projects/{project}/trainsets/{trainset}', 'trainset')->name('projects.trainsets.show');
    });
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
require __DIR__ . '/auth.php';
Route::get('/detail-proyek/{id}', function ($detail_proyek) {
    return Inertia::render('Detail/DetailProject', ['detail' => $detail_proyek]);
})->middleware(['auth', 'verified'])->name('detail-proyek');
Route::get('/{noProyek}/detail-ts/{id}', function ($detail_proyek, $detail_ts) {
    return Inertia::render('Detail/DetailTS', ['detailTS' => $detail_ts, 'noProyek' => $detail_proyek]);
})->middleware(['auth', 'verified'])->name('detail-ts');
Route::get('/{noProyek}/{kodeTS}/detail-kereta/{id}', function ($detail_proyek, $detail_ts, $detail_kereta) {
    return Inertia::render('Detail/DetailKereta', ['detailTS' => $detail_ts, 'noProyek' => $detail_proyek, 'susunanKereta' => $detail_kereta]);
})->middleware(['auth', 'verified'])->name('detail-kereta');
