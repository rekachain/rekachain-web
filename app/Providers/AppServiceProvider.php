<?php

namespace App\Providers;
// User
use App\Repositories\UserRepository;
use App\Services\UserService;
use App\Support\Interfaces\UserRepositoryInterface;
use App\Support\Interfaces\UserServiceInterface;
// Project
use App\Repositories\ProjectRepository;
use App\Services\ProjectService;
use App\Support\Interfaces\ProjectRepositoryInterface;
use App\Support\Interfaces\ProjectServiceInterface;
// Carriage
use App\Repositories\CarriageRepository;
use App\Services\CarriageService;
use App\Support\Interfaces\CarriageRepositoryInterface;
use App\Support\Interfaces\CarriageServiceInterface;
// Trainset
use App\Repositories\TrainsetRepository;
use App\Services\TrainsetService;
use App\Support\Interfaces\TrainsetRepositoryInterface;
use App\Support\Interfaces\TrainsetServiceInterface;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        $this->app->singleton(UserRepositoryInterface::class, UserRepository::class);
        $this->app->singleton(UserServiceInterface::class, UserService::class);
        $this->app->singleton(ProjectRepositoryInterface::class, ProjectRepository::class);
        $this->app->singleton(ProjectServiceInterface::class, ProjectService::class);
        $this->app->singleton(CarriageRepositoryInterface::class, CarriageRepository::class);
        $this->app->singleton(CarriageServiceInterface::class, CarriageService::class);
        $this->app->singleton(TrainsetRepositoryInterface::class, TrainsetRepository::class);
        $this->app->singleton(TrainsetServiceInterface::class, TrainsetService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        JsonResource::withoutWrapping();
    }
}
