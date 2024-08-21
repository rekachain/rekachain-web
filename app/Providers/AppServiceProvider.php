<?php

namespace App\Providers;

use App\Models\Permission;
use App\Observers\PermissionObserver;
use App\Repositories\CarriageRepository;
use App\Repositories\DivisionRepository;
use App\Repositories\PanelRepository;
use App\Repositories\PermissionRepository;
use App\Repositories\ProgressRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\RoleRepository;
use App\Repositories\TrainsetRepository;
use App\Repositories\TrainsetCarriagesRepository;
use App\Repositories\UserRepository;
use App\Repositories\WorkshopRepository;
use App\Repositories\WorkstationRepository;
use App\Repositories\RawMaterialRepository;
use App\Services\CarriageService;
use App\Services\DivisionService;
use App\Services\PanelService;
use App\Services\PermissionService;
use App\Services\ProgressService;
use App\Services\ProjectService;
use App\Services\RoleService;
use App\Services\TrainsetService;
use App\Services\TrainsetCarriagesService;
use App\Services\UserService;
use App\Services\WorkshopService;
use App\Services\WorkstationService;
use App\Services\RawMaterialService;
use App\Support\Interfaces\CarriageRepositoryInterface;
use App\Support\Interfaces\CarriageServiceInterface;
use App\Support\Interfaces\DivisionRepositoryInterface;
use App\Support\Interfaces\DivisionServiceInterface;
use App\Support\Interfaces\PanelRepositoryInterface;
use App\Support\Interfaces\PanelServiceInterface;
use App\Support\Interfaces\PermissionRepositoryInterface;
use App\Support\Interfaces\PermissionServiceInterface;
use App\Support\Interfaces\ProgressRepositoryInterface;
use App\Support\Interfaces\ProgressServiceInterface;
use App\Support\Interfaces\ProjectRepositoryInterface;
use App\Support\Interfaces\ProjectServiceInterface;
use App\Support\Interfaces\RoleRepositoryInterface;
use App\Support\Interfaces\RoleServiceInterface;
use App\Support\Interfaces\TrainsetRepositoryInterface;
use App\Support\Interfaces\TrainsetServiceInterface;
use App\Support\Interfaces\TrainsetCarriagesRepositoryInterface;
use App\Support\Interfaces\TrainsetCarriagesServiceInterface;
use App\Support\Interfaces\UserRepositoryInterface;
use App\Support\Interfaces\UserServiceInterface;
use App\Support\Interfaces\WorkshopRepositoryInterface;
use App\Support\Interfaces\WorkshopServiceInterface;
use App\Support\Interfaces\WorkstationRepositoryInterface;
use App\Support\Interfaces\WorkstationServiceInterface;
use App\Support\Interfaces\RawMaterialRepositoryInterface;
use App\Support\Interfaces\RawMaterialServiceInterface;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        if ($this->app->isLocal()) {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
        $this->app->singleton(UserRepositoryInterface::class, UserRepository::class);
        $this->app->singleton(UserServiceInterface::class, UserService::class);

        $this->app->singleton(ProjectRepositoryInterface::class, ProjectRepository::class);
        $this->app->singleton(ProjectServiceInterface::class, ProjectService::class);

        $this->app->singleton(CarriageRepositoryInterface::class, CarriageRepository::class);
        $this->app->singleton(CarriageServiceInterface::class, CarriageService::class);

        $this->app->singleton(TrainsetRepositoryInterface::class, TrainsetRepository::class);
        $this->app->singleton(TrainsetServiceInterface::class, TrainsetService::class);

        $this->app->singleton(TrainsetCarriagesRepositoryInterface::class, TrainsetCarriagesRepository::class);
        $this->app->singleton(TrainsetCarriagesServiceInterface::class, TrainsetCarriagesService::class);

        $this->app->singleton(WorkshopRepositoryInterface::class, WorkshopRepository::class);
        $this->app->singleton(WorkshopServiceInterface::class, WorkshopService::class);

        $this->app->singleton(DivisionRepositoryInterface::class, DivisionRepository::class);
        $this->app->singleton(DivisionServiceInterface::class, DivisionService::class);

        $this->app->singleton(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->singleton(RoleServiceInterface::class, RoleService::class);

        $this->app->singleton(PermissionRepositoryInterface::class, PermissionRepository::class);
        $this->app->singleton(PermissionServiceInterface::class, PermissionService::class);

        $this->app->singleton(WorkstationRepositoryInterface::class, WorkstationRepository::class);
        $this->app->singleton(WorkstationServiceInterface::class, WorkstationService::class);

        $this->app->singleton(PanelRepositoryInterface::class, PanelRepository::class);
        $this->app->singleton(PanelServiceInterface::class, PanelService::class);

        $this->app->singleton(ProgressRepositoryInterface::class, ProgressRepository::class);
        $this->app->singleton(ProgressServiceInterface::class, ProgressService::class);

        $this->app->singleton(RawMaterialRepositoryInterface::class, RawMaterialRepository::class);
        $this->app->singleton(RawMaterialServiceInterface::class, RawMaterialService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        Permission::observe(PermissionObserver::class);

        JsonResource::withoutWrapping();

        Gate::before(function ($user, $ability) {
            return $user->hasRole('Super Admin') ? true : null;
        });
    }
}
