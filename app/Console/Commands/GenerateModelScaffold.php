<?php

namespace App\Console\Commands;

use File;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Str;

enum ScriptFileExtension: string {
    case TypeScript = '.ts';
    case JavaScript = '.js';
}

class Model {
    public string $name;
    public string $studly;
    public string $camel;
    public string $snake;
    public string $upper;
    public string $upperSnake;
    public string $lower;
    public string $kebab;

    public function __construct(string $modelName) {
        $this->name = $modelName;
        $this->studly = Str::studly($modelName);
        $this->camel = Str::camel($modelName);
        $this->snake = Str::snake($modelName);
        $this->upper = Str::upper($modelName);
        $this->upperSnake = Str::upper($this->snake);
        $this->lower = Str::lower($modelName);
        $this->kebab = Str::kebab($modelName);
    }
}

class GenerateModelScaffold extends Command {
    private static ScriptFileExtension $frontEndExtensions = ScriptFileExtension::TypeScript;
    private static Model $model;
    private static bool $withAll = false;
    private static bool $withMigration = false;
    private static bool $withSeeder = false;
    private static bool $withFactory = false;
    private static bool $withFrontend = false;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:scaffold {model : The name of the model}
                            {--all : Generate seeder, factory, and Frontend structure for the model}
                            {--migration : Generate a migration for the model}
                            {--seeder : Generate a seeder for the model}
                            {--factory : Generate a factory for the model}
                            {--frontend : Generate Frontend structure for the model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scaffold model, repository, service, controller, request files for a model with optional seeder, factory, and Frontend structure generation.';

    /**
     * Execute the console command.
     */
    public function handle(): void {
        self::$model = new Model($this->argument('model'));
        self::$withAll = $this->option('all');
        self::$withMigration = $this->option('migration');
        self::$withSeeder = $this->option('seeder');
        self::$withFactory = $this->option('factory');
        self::$withFrontend = $this->option('frontend');

        if (self::$withAll) {
            self::$withMigration = true;
            self::$withSeeder = true;
            self::$withFactory = true;
            self::$withFrontend = true;
        }

        $this->generateModel();
        $this->generateFiles();

        $model = self::$model->name;

        $this->info('Scaffolding for model ' . $model . ' is complete.');
    }

    protected function generateModel(): void {
        $options = [
            'name' => self::$model->name,
            '--migration' => self::$withMigration,
            '--seed' => self::$withSeeder,
            '--factory' => self::$withFactory,
        ];

        $modelName = self::$model->studly;
        $withSeeder = self::$withSeeder;
        $withFactory = self::$withFactory;

        Artisan::call('make:model', $options);

        $this->info("Model {$modelName} generated with migration" . ($withSeeder ? ' and seeder' : '') . ($withFactory ? ' and factory' : ''));
    }

    protected function generateFiles(): void {
        $withFrontend = self::$withFrontend;

        $paths = $this->definePaths();
        $templates = $this->defineTemplates();

        foreach ($paths as $key => $path) {
            File::ensureDirectoryExists(dirname($path));

            if (!File::exists($path) && $key !== 'controller') {
                File::put($path, $templates[$key]);
                $this->info("File created: {$path}");
            } else {
                if ($key !== 'controller') {
                    $this->warn("File already exists, skipping: {$path}");
                }
            }
        }

        $this->generateController();

        if ($withFrontend) {
            $this->handleFrontendScaffolding();
        }
    }

    protected function definePaths(): array {
        $basePath = app_path();
        $resourcePath = resource_path();
        $modelNameStudly = self::$model->studly;
        $modelCamel = self::$model->camel;
        $withFrontend = self::$withFrontend;
        $scriptExtension = self::$frontEndExtensions->value;

        $paths = [
            'repositoryInterface' => "{$basePath}/Support/Interfaces/Repositories/{$modelNameStudly}RepositoryInterface.php",
            'serviceInterface' => "{$basePath}/Support/Interfaces/Services/{$modelNameStudly}ServiceInterface.php",
            'repository' => "{$basePath}/Repositories/{$modelNameStudly}Repository.php",
            'service' => "{$basePath}/Services/{$modelNameStudly}Service.php",
            'controller' => "{$basePath}/Http/Controllers/{$modelNameStudly}Controller.php",
            'storeRequest' => "{$basePath}/Http/Requests/{$modelNameStudly}/Store{$modelNameStudly}Request.php",
            'updateRequest' => "{$basePath}/Http/Requests/{$modelNameStudly}/Update{$modelNameStudly}Request.php",
            'resource' => "{$basePath}/Http/Resources/{$modelNameStudly}Resource.php",
        ];

        if ($withFrontend) {
            $paths = array_merge($paths, [
                'reactModelInterface' => "{$resourcePath}/js/support/models/{$modelNameStudly}{$scriptExtension}",
                'reactResource' => "{$resourcePath}/js/support/interfaces/resources/{$modelNameStudly}Resource{$scriptExtension}",
                'reactService' => "{$resourcePath}/js/services/{$modelCamel}Service{$scriptExtension}",
            ]);
        }

        return $paths;
    }

    protected function defineTemplates(): array {
        $modelNameStudly = self::$model->studly;
        $modelCamel = self::$model->camel;
        $modelUpper = self::$model->upper;
        $withFrontend = self::$withFrontend;

        $templates = [
            'repositoryInterface' => $this->getRepositoryInterfaceTemplate($modelNameStudly),
            'serviceInterface' => $this->getServiceInterfaceTemplate($modelNameStudly),
            'repository' => $this->getRepositoryTemplate($modelNameStudly),
            'service' => $this->getServiceTemplate($modelNameStudly),
            'storeRequest' => $this->getStoreRequestTemplate($modelNameStudly),
            'updateRequest' => $this->getUpdateRequestTemplate($modelNameStudly),
            'resource' => $this->getResourceTemplate($modelNameStudly),
        ];

        if ($withFrontend) {
            $templates = array_merge($templates, [
                'reactModelInterface' => $this->getFrontendModelInterfaceTemplate($modelNameStudly),
                'reactResource' => $this->getFrontendResourceTemplate($modelNameStudly),
                'reactService' => $this->getFrontendServiceTemplate($modelCamel, $modelNameStudly, $modelUpper),
            ]);
        }

        return $templates;

    }

    protected function generateController(): void {
        $modelNameStudly = self::$model->studly;
        $modelNameLower = self::$model->lower;
        $controllerPath = app_path("Http/Controllers/{$modelNameStudly}Controller.php");

        if (File::exists($controllerPath)) {
            $this->warn("File already exists, skipping: {$controllerPath}");

            return;
        }

        $controllerContent = $this->getControllerTemplate($modelNameStudly, $modelNameLower);
        File::put($controllerPath, $controllerContent);

        $this->info("Controller created: {$controllerPath}");
    }

    protected function handleFrontendScaffolding(): void {
        $modelUpperSnake = self::$model->upperSnake;
        $modelDashed = self::$model->kebab;

        $this->info('Appending generated model to Frontend ROUTES constant');
        $this->appendFrontendModelToRoutes($modelUpperSnake, $modelDashed);

        $this->info('Appending Frontend model interfaces and resources');
        $this->appendFrontendModelInterface();
        $this->appendFrontendResource();
    }

    // Templates for each file type
    protected function getRepositoryInterfaceTemplate($modelName): string {
        return <<<PHP
        <?php

        namespace App\Support\Interfaces\Repositories;

        use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\Contracts\BaseRepositoryInterface;

        interface {$modelName}RepositoryInterface extends BaseRepositoryInterface {}
        PHP;
    }

    protected function getServiceInterfaceTemplate($modelName): string {
        return <<<PHP
        <?php

        namespace App\Support\Interfaces\Services;

        use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

        interface {$modelName}ServiceInterface extends BaseCrudServiceInterface {}
        PHP;
    }

    protected function getRepositoryTemplate($modelName): string {
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

                \$query = \$this->applySearchFilters(\$query, \$searchParams, ['name']);

                \$query = \$this->applyResolvedRelations(\$query, \$searchParams);

                \$query = \$this->applySorting(\$query, \$searchParams);

                return \$query;
            }
        }
        PHP;
    }

    protected function getServiceTemplate($modelName): string {
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

    protected function getControllerTemplate($modelName, $modelNameLower): string {
        return <<<PHP
        <?php

        namespace App\Http\Controllers;

        use App\Http\Requests\\{$modelName}\Store{$modelName}Request;
        use App\Http\Requests\\{$modelName}\Update{$modelName}Request;
        use App\Http\Resources\\{$modelName}Resource;
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

    protected function getStoreRequestTemplate($modelName): string {
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

    protected function getUpdateRequestTemplate($modelName): string {
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

    protected function getResourceTemplate($modelName): string {
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

    protected function getFrontendModelInterfaceTemplate($modelName): string {
        return <<<TS
        export interface {$modelName} {
            id: number;
            created_at: string;
            updated_at: string;
        }
        TS;
    }

    protected function getFrontendResourceTemplate($modelName): string {
        return <<<TS
        import { {$modelName} } from '@/support/models';
        import { Resource } from '@/support/interfaces/resources';

        export interface {$modelName}Resource extends Resource, {$modelName} {}
        TS;
    }

    protected function getFrontendServiceTemplate($modelCamel, $modelName, $modelUpper): string {
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

    protected function appendFrontendModelInterface(): void {
        $modelName = self::$model->studly;
        $scriptExtension = self::$frontEndExtensions->value;
        $modelInterfacePath = resource_path("js/support/models/index{$scriptExtension}");
        $modelInterfaceContent = File::get($modelInterfacePath);

        $modelInterfaceContent .= "\nexport * from './{$modelName}';";

        File::put($modelInterfacePath, $modelInterfaceContent);
    }

    protected function appendFrontendResource(): void {
        $modelName = self::$model->studly;
        $scriptExtension = self::$frontEndExtensions->value;
        $resourceInterfacePath = resource_path("js/support/interfaces/resources/index{$scriptExtension}");
        $resourceInterfaceContent = File::get($resourceInterfacePath);

        $resourceInterfaceContent .= "\nexport * from './{$modelName}Resource';";

        File::put($resourceInterfacePath, $resourceInterfaceContent);
    }

    protected function appendFrontendModelToRoutes(): void {
        $modelUpperSnake = self::$model->upperSnake;
        $modelDashed = self::$model->kebab;
        $scriptExtension = self::$frontEndExtensions->value;
        $routesPath = resource_path("js/support/constants/routes{$scriptExtension}");
        $routesContent = File::get($routesPath);
        $routePostfix = 'S';
        $routePostfixLower = Str::lower($routePostfix);

        // Check if the route is already defined to avoid duplicates
        if (strpos($routesContent, "{$modelUpperSnake}{$routePostfix}") === false) {
            // Append the new route at the end of the ROUTES object
            $routesContent = str_replace('};', "\t{$modelUpperSnake}{$routePostfix}: '{$modelDashed}{$routePostfixLower}',\n};", $routesContent);

            // Write back the updated content to the routes file
            File::put($routesPath, $routesContent);
        } else {
            $this->warn("Route {$modelUpperSnake}{$routePostfix} already exists.");
        }
    }
}
