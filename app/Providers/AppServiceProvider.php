<?php

namespace App\Providers;

use App\Models\Permission;
use App\Models\Trainset;
use App\Observers\PermissionObserver;
use App\Observers\TrainsetObserver;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        if ($this->app->isLocal()) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }

        // gaperlu manual binding karena sudah ada RepositoryServiceProvider
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        Permission::observe(PermissionObserver::class);
        Trainset::observe(TrainsetObserver::class);

        JsonResource::withoutWrapping();

        Gate::before(function ($user, $ability) {
            return $user->hasRole('Super Admin') ? true : null;
        });
    }
}
