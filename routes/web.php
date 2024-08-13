<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Input;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', UserController::class);
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
require __DIR__ . '/auth.php';
Route::get('/detail-proyek/{id}', function ($detail) {

    // $nama = Input::get("color");
    return Inertia::render('Detail/DetailProject',['detail'=>$detail]);
})->middleware(['auth', 'verified'])->name('detail-proyek');