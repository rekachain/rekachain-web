<?php

namespace App\Console\Commands;

use File;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Str;

class GenerateModelScaffold extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:scaffold {model : The name of the model} {--seeder : Generate a seeder for the model} {--factory : Generate a factory for the model} {--react : Generate React standard data model structure with its resources and services }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scaffold model, repository, service, controller, request files for a model with optional seeder and factory generation';

    /**
     * Execute the console command.
     */
    public function handle() {
        $model = $this->argument('model');
        $withSeeder = $this->option('seeder');
        $withFactory = $this->option('factory');
        $withReact = $this->option('react');

        // Create the model with migration
        $this->generateModel($model, true, $withSeeder, $withFactory);

        // Generate the rest of the files
        $this->generateFiles($model, $withReact);

        $this->info('Files for ' . $model . ' have been generated.');
    }

    protected function generateModel($model, $withMigration, $withSeeder, $withFactory) {
        $options = ['--migration' => true];
        if ($withSeeder) {
            $options['--seeder'] = true;
        }
        if ($withFactory) {
            $options['--factory'] = true;
        }

        $options = [
            'name' => $model,
            '--migration' => $withMigration,
            '--seed' => $withSeeder,
            '--factory' => $withFactory,
        ];

        Artisan::call('make:model', $options);

        $this->info("Model {$model} has been created with migration" . ($withSeeder ? ' and seeder' : '') . ($withFactory ? ' and factory' : ''));

    }

    protected function generateFiles($model, $withReact = false) {
        $basePath = app_path();
        $resourcePath = resource_path();
        $modelName = Str::studly($model); // Capitalizes the first letter (e.g., User)
        $modelCamel = Str::camel($model); // Converts to camelCase (e.g., user)
        $modelSnake = Str::snake($model); // Converts to snake_case (e.g., user)
        $modelUpperSnake = Str::upper(Str::snake($model)); // Converts to UPPERCASE_SNAKE_CASE (e.g., USER)
        $modelDashed = Str::kebab($model); // Converts to kebab-case (e.g., user)

        // Paths for files to be created
        $paths = [
            'repositoryInterface' => $basePath . "/Support/Interfaces/Repositories/{$modelName}RepositoryInterface.php",
            'serviceInterface' => $basePath . "/Support/Interfaces/Services/{$modelName}ServiceInterface.php",
            'repository' => $basePath . "/Repositories/{$modelName}Repository.php",
            'service' => $basePath . "/Services/{$modelName}Service.php",
            'controller' => $basePath . "/Http/Controllers/{$modelName}Controller.php",
            'storeRequest' => $basePath . "/Http/Requests/{$modelName}/Store{$modelName}Request.php",
            'updateRequest' => $basePath . "/Http/Requests/{$modelName}/Update{$modelName}Request.php",
            'resource' => $basePath . "/Http/Resources/{$modelName}Resource.php",
            'reactModelInterface' => $resourcePath . '/js/support/models/' . $modelName . '.ts',
            'reactResource' => $resourcePath . '/js/support/interfaces/resources/' . $modelName . 'Resource.ts',
            'reactService' => $resourcePath . '/js/services/' . $modelCamel . 'Service.ts',
        ];

        // Ensure directories exist
        foreach ($paths as $path) {
            File::ensureDirectoryExists(dirname($path));
        }

        // Template data for files
        $templates = [
            'repositoryInterface' => $this->getRepositoryInterfaceTemplate($modelName),
            'serviceInterface' => $this->getServiceInterfaceTemplate($modelName),
            'repository' => $this->getRepositoryTemplate($modelName),
            'service' => $this->getServiceTemplate($modelName),
            'storeRequest' => $this->getStoreRequestTemplate($modelName),
            'updateRequest' => $this->getUpdateRequestTemplate($modelName),
            'resource' => $this->getResourceTemplate($modelName),
        ];

        if ($withReact) {
            $templates['reactModelInterface'] = $this->getReactModelInterfaceTemplate($modelName);
            $templates['reactResource'] = $this->getReactResourceTemplate($modelName);
            $templates['reactService'] = $this->getReactServiceTemplate($modelCamel, $modelName, $modelUpperSnake);
        }

        // Generate the controller separately to handle camelCase correctly
        $this->generateController($model);

        // Write the other files if they don't already exist, with colored logs
        foreach ($paths as $key => $path) {
            if (!File::exists($path) && $key !== 'controller') { // Controller is handled separately
                File::put($path, $templates[$key]);
                $this->info("File created: {$path}", 'fg=green');
            } else {
                if ($key !== 'controller') {
                    $this->error("File already exists, skipping: {$path}", 'fg=red');
                }
            }
        }

        if ($withReact) {
            $this->info('Appending generated model into ROUTES file constant', 'fg=green');
            $this->appendReactModelToRoutes($modelUpperSnake, $modelDashed);

            $this->info('Appending generated model interface and resources to each of the respective index files.', 'fg=green');
            $this->appendReactModelInterface($modelName);
            $this->appendReactResource($modelName);
        }
    }

    /**
     * Generates the controller for the given model, ensuring camelCase is used for injected services.
     */
    protected function generateController($model) {
        $modelName = Str::studly($model); // Capitalizes the first letter (e.g., RawMaterial)
        $modelNameLower = Str::lower($model); // All lowercase (e.g., user)
        $camelCasedService = Str::camel($model) . 'Service'; // Converts to camelCase (e.g., rawMaterialService)
        $serviceInterface = "{$modelName}ServiceInterface";

        $controllerPath = app_path("Http/Controllers/{$modelName}Controller.php");

        // Check if the controller file exists
        if (File::exists($controllerPath)) {
            $this->error("File already exists, skipping: {$controllerPath}", 'fg=red');

            return;
        }

        // Template for the controller
        $controllerContent = <<<PHP
        <?php

        namespace App\Http\Controllers;

        use App\Http\Requests\\{$modelName}\Store{$modelName}Request;
        use App\Http\Requests\\{$modelName}\Update{$modelName}Request;
        use App\Http\Resources\\{$modelName}Resource;
        use App\Models\\{$modelName};
        use App\Support\Interfaces\Services\\{$serviceInterface};
        use Illuminate\Http\Request;

        class {$modelName}Controller extends Controller {
            public function __construct(protected {$serviceInterface} \${$camelCasedService}) {}

            public function index(Request \$request) {
                return inertia('{$modelName}/Index', [
                    'data' => {$modelName}Resource::collection(\$this->{$camelCasedService}->getAllPaginated(\$request->all())),
                ]);
            }

            public function store(Store{$modelName}Request \$request) {
                return \$this->{$camelCasedService}->create(\$request->validated());
            }

            public function show({$modelName} \${$modelNameLower}) {
                return new {$modelName}Resource(\${$modelNameLower});
            }

            public function update(Update{$modelName}Request \$request, {$modelName} \${$modelNameLower}) {
                return \$this->{$camelCasedService}->update(\${$modelNameLower}, \$request->validated());
            }

            public function destroy({$modelName} \${$modelNameLower}) {
                return \$this->{$camelCasedService}->delete(\${$modelNameLower});
            }
        }
        PHP;

        // Write the controller file
        File::put($controllerPath, $controllerContent);

        $this->info("File created: {$controllerPath}", 'fg=green');
    }

    // Templates for each file type
    protected function getRepositoryInterfaceTemplate($modelName) {
        return <<<PHP
        <?php

        namespace App\Support\Interfaces\Repositories;

        use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\Contracts\BaseRepositoryInterface;

        interface {$modelName}RepositoryInterface extends BaseRepositoryInterface {}
        PHP;
    }

    protected function getServiceInterfaceTemplate($modelName) {
        return <<<PHP
        <?php

        namespace App\Support\Interfaces\Services;

        use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

        interface {$modelName}ServiceInterface extends BaseCrudServiceInterface {}
        PHP;
    }

    protected function getRepositoryTemplate($modelName) {
        return <<<PHP
        <?php

        namespace App\Repositories;

        use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
        use App\Models\\{$modelName};
        use App\Support\Interfaces\Repositories\\{$modelName}RepositoryInterface;
        use App\Traits\Repositories\HandlesFiltering;
        use App\Traits\Repositories\HandlesRelations;
        use App\Traits\Repositories\HandlesSorting;
        use Illuminate\Database\Eloquent\Builder;

        class {$modelName}Repository extends BaseRepository implements {$modelName}RepositoryInterface {
            use HandlesFiltering, HandlesRelations, HandlesSorting;

            protected function getModelClass(): string {
                return {$modelName}::class;
            }

            protected function applyFilters(array \$searchParams = []): Builder {
                \$query = \$this->getQuery();

                \$query = \$this->applySearchFilters(\$query, \$searchParams, ['name', 'email']);

                \$query = \$this->applyResolvedRelations(\$query, \$searchParams);

                \$query = \$this->applySorting(\$query, \$searchParams);

                return \$query;
            }
        }
        PHP;
    }

    protected function getServiceTemplate($modelName) {
        return <<<PHP
        <?php

        namespace App\Services;

        use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
        use App\Support\Interfaces\Repositories\\{$modelName}RepositoryInterface;
        use App\Support\Interfaces\Services\\{$modelName}ServiceInterface;

        class {$modelName}Service extends BaseCrudService implements {$modelName}ServiceInterface {
            protected function getRepositoryClass(): string {
                return {$modelName}RepositoryInterface::class;
            }
        }
        PHP;
    }

    protected function getControllerTemplate($modelName, $modelNameLower) {
        return <<<PHP
        <?php

        namespace App\Http\Controllers;

        use App\Http\Requests\\{$modelName}\Store{$modelName}Request;
        use App\Http\Requests\\{$modelName}\Update{$modelName}Request;
        use App\Http\Resources\\{$modelName}\\{$modelName}Resource;
        use App\Models\\{$modelName};
        use App\Support\Interfaces\Services\\{$modelName}ServiceInterface;
        use Illuminate\Http\Request;

        class {$modelName}Controller extends Controller {
            public function __construct(protected {$modelName}ServiceInterface \${$modelNameLower}Service) {}

            public function index(Request \$request) {
                return inertia('{$modelName}/Index', [
                    'data' => {$modelName}Resource::collection(\$this->{$modelNameLower}Service->getAllPaginated(\$request->all())),
                ]);
            }

            public function store(Store{$modelName}Request \$request) {
                return \$this->{$modelNameLower}Service->create(\$request->validated());
            }

            public function show({$modelName} \${$modelNameLower}) {
                return new {$modelName}Resource(\${$modelNameLower});
            }

            public function update(Update{$modelName}Request \$request, {$modelName} \${$modelNameLower}) {
                return \$this->{$modelNameLower}Service->update(\${$modelNameLower}, \$request->validated());
            }

            public function destroy({$modelName} \${$modelNameLower}) {
                return \$this->{$modelNameLower}Service->delete(\${$modelNameLower});
            }
        }
        PHP;
    }

    protected function getStoreRequestTemplate($modelName) {
        return <<<PHP
        <?php

        namespace App\Http\Requests\\{$modelName};

        use Illuminate\Foundation\Http\FormRequest;

        class Store{$modelName}Request extends FormRequest {
            public function rules(): array {
                return [
                    // Add your validation rules here
                ];
            }
        }
        PHP;
    }

    protected function getUpdateRequestTemplate($modelName) {
        return <<<PHP
        <?php

        namespace App\Http\Requests\\{$modelName};

        use Illuminate\Foundation\Http\FormRequest;

        class Update{$modelName}Request extends FormRequest {
            public function rules(): array {
                return [
                    // Add your validation rules here
                ];
            }
        }
        PHP;
    }

    protected function getResourceTemplate($modelName) {
        return <<<PHP
        <?php

        namespace App\Http\Resources;

        use Illuminate\Http\Resources\Json\JsonResource;

        class {$modelName}Resource extends JsonResource {
            public function toArray(\$request): array {
                return [
                    'id' => \$this->id,
                    'created_at' => \$this->created_at->toDateTimeString(),
                    'updated_at' => \$this->updated_at->toDateTimeString(),
                ];
            }
        }
        PHP;
    }

    protected function getReactModelInterfaceTemplate($modelName) {
        return <<<TS
        export interface {$modelName} {
            id: number;
            created_at: string;
            updated_at: string;
        }
        TS;
    }

    protected function getReactResourceTemplate($modelName) {
        return <<<TS
        import { {$modelName} } from '@/support/models';
        import { Resource } from '@/support/interfaces/resources/Resource';

        export interface {$modelName}Resource extends Resource, {$modelName} {}
        TS;
    }

    protected function getReactServiceTemplate($modelCamel, $modelName, $modelUpper) {
        $routeName = $modelUpper . 'S';

        return <<<TS
        import { ROUTES } from '@/support/constants/routes';
        import { serviceFactory } from '@/services/serviceFactory';
        import { {$modelName}Resource } from '@/support/interfaces/resources';

        export const {$modelCamel}Service = {
            ...serviceFactory<{$modelName}Resource>(ROUTES.{$routeName}),
            customFunctionExample: async () => {
                console.log('custom function');
            },
        };
        TS;
    }

    protected function appendReactModelInterface($modelName) {
        $modelInterfacePath = resource_path('js/support/models/index.ts');
        $modelInterfaceContent = File::get($modelInterfacePath);

        $modelInterfaceContent .= "\nexport * from './{$modelName}';";

        File::put($modelInterfacePath, $modelInterfaceContent);
    }

    protected function appendReactResource($modelName) {
        $resourceInterfacePath = resource_path('js/support/interfaces/resources/index.ts');
        $resourceInterfaceContent = File::get($resourceInterfacePath);

        $resourceInterfaceContent .= "\nexport * from './{$modelName}Resource';";

        File::put($resourceInterfacePath, $resourceInterfaceContent);
    }

    protected function appendReactModelToRoutes($modelUpperSnake, $modelDashed) {
        $routesPath = resource_path('js/support/constants/routes.ts');
        $routesContent = File::get($routesPath);
        $routePostfix = 'S';
        $routePostfixLower = Str::lower($routePostfix);

        $routesContent = str_replace('export const ROUTES = {', "export const ROUTES = {\n\t{$modelUpperSnake}{$routePostfix}: '{$modelDashed}{$routePostfixLower}',", $routesContent);

        File::put($routesPath, $routesContent);
    }
}
