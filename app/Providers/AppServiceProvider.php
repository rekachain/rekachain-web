<?php

namespace App\Providers;

use App\Repositories\UserRepository;
use App\Repositories\WorkshopRepository;
use App\Services\UserService;
use App\Services\WorkshopService;
use App\Support\Interfaces\UserRepositoryInterface;
use App\Support\Interfaces\UserServiceInterface;
use App\Support\Interfaces\WorkshopRepositoryInterface;
use App\Support\Interfaces\WorkshopServiceInterface;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        $this->app->singleton(UserRepositoryInterface::class, UserRepository::class);
        $this->app->singleton(UserServiceInterface::class, UserService::class);
        
        $this->app->singleton(WorkshopRepositoryInterface::class, WorkshopRepository::class);
        $this->app->singleton(WorkshopServiceInterface::class, WorkshopService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        JsonResource::withoutWrapping();
    }
}
