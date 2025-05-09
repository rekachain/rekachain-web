<?php

namespace App\Console\Commands;

use File;
use Illuminate\Console\Command;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
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
    public string $kebabPlural;

    public function __construct(string $modelName) {
        $this->name = $modelName;
        $this->studly = Str::studly($modelName);
        $this->camel = Str::camel($modelName);
        $this->snake = Str::snake($modelName);
        $this->upper = Str::upper($modelName);
        $this->upperSnake = Str::upper($this->snake);
        $this->lower = Str::lower($modelName);
        $this->kebab = Str::kebab($modelName);
        $this->kebabPlural = Str::plural($this->kebab);
    }
}

class GenerateModelScaffold extends Command {
    private static ScriptFileExtension $frontEndExtensions = ScriptFileExtension::TypeScript;
    private static Model $model;
    private static bool $withAll = false;
    private static bool $withMigration = false;
    private static bool $withSeeder = false;
    private static bool $withFactory = false;
    private static bool $withController = false;
    private static bool $withApiController = false;
    private static bool $withTest = false;
    private static bool $asPivot = false;
    private static bool $withFrontend = false;
    private static array $excluded = [];
    private static bool $showHelp = false;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:scaffold {model : The name of the model}
                            {--a|all : Generate seeder, controller, factory, and Frontend structure for the model (use --exclude for exclude specific files)}
                            {--m|migration : Generate a migration for the model}
                            {--s|seeder : Generate a seeder for the model}
                            {--f|factory : Generate a factory for the model}
                            {--controller : Generate a controller for the model}
                            {--api-controller : Generate an API controller for the model}
                            {--test : Generate a test for the model}
                            {--p|pivot : Generate a pivot model for the model}
                            {--frontend : Generate Frontend structure for the model}
                            {--e|exclude=* : Do not generate files for the specified model}
                            {--h|help : Display this help message}';

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
        self::$withController = $this->option('controller');
        self::$withApiController = $this->option('api-controller');
        self::$withTest = $this->option('test');
        self::$asPivot = $this->option('pivot');
        self::$withFrontend = $this->option('frontend');
        self::$excluded = $this->option('exclude');
        self::$showHelp = $this->option('help');

        if (self::$showHelp) {
            $this->help();

            return;
        }

        if (self::$withAll) {
            self::$withMigration = !in_array('migration', self::$excluded);
            self::$withSeeder = !in_array('seeder', self::$excluded);
            self::$withFactory = !in_array('factory', self::$excluded);
            self::$withController = !in_array('controller', self::$excluded);
            self::$withApiController = !in_array('api-controller', self::$excluded);
            self::$withTest = !in_array('test', self::$excluded);
            self::$withFrontend = !in_array('frontend', self::$excluded);
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
            '--pivot' => self::$asPivot,
        ];

        $modelName = self::$model->studly;
        $withSeeder = self::$withSeeder;
        $withFactory = self::$withFactory;
        $asPivot = self::$asPivot;

        Artisan::call('make:model', $options);

        $this->info("Model {$modelName} generated with migration" . ($withSeeder ? ' and seeder' : '') . ($withFactory ? ' and factory' : '') . ($asPivot ? ' as pivot' : ''));
    }

    protected function generateFiles(): void {
        $withFrontend = self::$withFrontend;

        $paths = $this->definePaths();
        $templates = $this->defineTemplates();

        foreach ($paths as $key => $path) {
            File::ensureDirectoryExists(dirname($path));

            if (!File::exists($path) && $key !== 'controller' && $key !== 'apiController') {
                File::put($path, $templates[$key]);
                $this->info("File created: {$path}");
            } else {
                if ($key !== 'controller' && $key !== 'apiController') {
                    $this->warn("File already exists, skipping: {$path}");
                }
            }
        }

        if (self::$withController) {
            $this->generateController();
            if (self::$withTest) {
                $this->generateControllerTest();
            }
        }
        if (self::$withApiController) {
            $this->generateApiController();
            if (self::$withTest) {
                $this->generateApiControllerTest();
            }
        }

        if ($withFrontend) {
            $this->generateRequiredFiles();
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
                'reactModelInterface' => "{$resourcePath}/js/Support/Interfaces/Models/{$modelNameStudly}{$scriptExtension}",
                'reactResource' => "{$resourcePath}/js/Support/Interfaces/Resources/{$modelNameStudly}Resource{$scriptExtension}",
                'reactService' => "{$resourcePath}/js/Services/{$modelCamel}Service{$scriptExtension}",
            ]);
        }

        return $paths;
    }

    protected function defineTemplates(): array {
        $withFrontend = self::$withFrontend;

        $templates = [
            'repositoryInterface' => $this->getRepositoryInterfaceTemplate(),
            'serviceInterface' => $this->getServiceInterfaceTemplate(),
            'repository' => $this->getRepositoryTemplate(),
            'service' => $this->getServiceTemplate(),
            'storeRequest' => $this->getStoreRequestTemplate(),
            'updateRequest' => $this->getUpdateRequestTemplate(),
            'resource' => $this->getResourceTemplate(),
        ];

        if ($withFrontend) {
            $templates = array_merge($templates, [
                'reactModelInterface' => $this->getFrontendModelInterfaceTemplate(),
                'reactResource' => $this->getFrontendResourceTemplate(),
                'reactService' => $this->getFrontendServiceTemplate(),
            ]);
        }

        return $templates;

    }

    protected function generateController(): void {
        $modelNameStudly = self::$model->studly;
        $modelNameCamel = self::$model->camel;
        $controllerPath = app_path("Http/Controllers/{$modelNameStudly}Controller.php");

        if (File::exists($controllerPath)) {
            $this->warn("File already exists, skipping: {$controllerPath}");

            return;
        }

        $controllerContent = $this->getControllerTemplate($modelNameStudly, $modelNameCamel);
        File::put($controllerPath, $controllerContent);

        $this->info("Controller created: {$controllerPath}");
    }

    protected function generateApiController(): void {
        $modelNameStudly = self::$model->studly;
        $modelNameCamel = self::$model->camel;
        $apiControllerPath = app_path("Http/Controllers/Api/Api{$modelNameStudly}Controller.php");

        if (File::exists($apiControllerPath)) {
            $this->warn("File already exists, skipping: {$apiControllerPath}");

            return;
        }

        $apiControllerContent = $this->getApiControllerTemplate();
        File::put($apiControllerPath, $apiControllerContent);

        $this->info("API Controller created: {$apiControllerPath}");
    }

    protected function generateControllerTest(): void {
        $modelNameStudly = self::$model->studly;
        $controllerTestPath = base_path("tests/Feature/Http/Controllers/{$modelNameStudly}ControllerTest.php");

        if (File::exists($controllerTestPath)) {
            $this->warn("File already exists, skipping: {$controllerTestPath}");

            return;
        }

        $controllerTestContent = $this->getControllerTestTemplate();
        File::put($controllerTestPath, $controllerTestContent);

        $this->info("Controller Test created: {$controllerTestPath}");
    }

    protected function generateApiControllerTest(): void {
        $modelNameStudly = self::$model->studly;
        $apiControllerTestPath = base_path("tests/Feature/Http/Controllers/Api/Api{$modelNameStudly}ControllerTest.php");

        if (File::exists($apiControllerTestPath)) {
            $this->warn("File already exists, skipping: {$apiControllerTestPath}");

            return;
        }

        $apiControllerTestContent = $this->getApiControllerTestTemplate();
        File::put($apiControllerTestPath, $apiControllerTestContent);

        $this->info("API Controller Test created: {$apiControllerTestPath}");
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

    protected function generateRequiredFiles() {
        $filesToCheck = [
            'resources/js/Support/Interfaces/Resources/Resource.ts' => <<<'TS'
            export interface Resource {
                id: number;
                created_at: string;
                updated_at: string;
            }
        TS,
            'resources/js/Support/Interfaces/Models/index.ts' => <<<'TS'
            // Add your model Interfaces here
        TS,
            'resources/js/Support/Interfaces/Resources/index.ts' => <<<'TS'
            // Add your resource Interfaces here
        TS,
            'resources/js/Services/serviceFactory.ts' => <<<'TS'
            import { PaginateResponse } from '@/Support/Interfaces/Others';
            import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
            import { Resource } from '@/Support/Interfaces/Resources';

            const DEBUG_MODE = true;

            export function serviceFactory<T extends Resource>(baseRoute: string) {
                return {
                    // CRUD methods here...
                };
            }
        TS,
        ];

        foreach ($filesToCheck as $filePath => $content) {
            $fullPath = base_path($filePath);
            $directory = dirname($fullPath);

            // Ensure the directory exists
            if (!is_dir($directory)) {
                mkdir($directory, 0755, true); // Create the directory recursively if needed
            }

            if (!file_exists($fullPath)) {
                file_put_contents($fullPath, $content);
                $this->info("Created: {$filePath}");
            } else {
                $this->info("File already exists: {$filePath}");
            }
        }
    }

    // Templates for each file type
    protected function getRepositoryInterfaceTemplate(): string {
        $modelName = self::$model->studly;

        return <<<PHP
        <?php

        namespace App\Support\Interfaces\Repositories;

        interface {$modelName}RepositoryInterface extends BaseRepositoryInterface {}
        PHP;
    }

    protected function getServiceInterfaceTemplate(): string {
        $modelName = self::$model->studly;

        return <<<PHP
        <?php

        namespace App\Support\Interfaces\Services;

        use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

        interface {$modelName}ServiceInterface extends BaseCrudServiceInterface {}
        PHP;
    }

    protected function getRepositoryTemplate(): string {
        $modelName = self::$model->studly;

        return <<<PHP
        <?php

        namespace App\Repositories;

        use App\Models\\{$modelName};
        use App\Support\Interfaces\Repositories\\{$modelName}RepositoryInterface;

        class {$modelName}Repository extends BaseRepository implements {$modelName}RepositoryInterface {
            protected function getModelClass(): string {
                return {$modelName}::class;
            }
        }
        PHP;
    }

    protected function getServiceTemplate(): string {
        $modelName = self::$model->studly;

        return <<<PHP
        <?php

        namespace App\Services;

        use App\Support\Interfaces\Repositories\\{$modelName}RepositoryInterface;
        use App\Support\Interfaces\Services\\{$modelName}ServiceInterface;

        class {$modelName}Service extends BaseCrudService implements {$modelName}ServiceInterface {
            protected function getRepositoryClass(): string {
                return {$modelName}RepositoryInterface::class;
            }
        }
        PHP;
    }

    protected function getControllerTemplate(): string {
        $modelName = self::$model->studly;
        $modelNameCamel = self::$model->camel;

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
            public function __construct(protected {$modelName}ServiceInterface \${$modelNameCamel}Service) {}

            public function index(Request \$request) {
                \$perPage = \$request->get('perPage', 10);
                \$data = {$modelName}Resource::collection(\$this->{$modelNameCamel}Service->getAllPaginated(\$request->query(), \$perPage));

                if (\$this->ajax()) {
                    return \$data;
                }

                return inertia('{$modelName}/Index');
            }

            public function create() {
                return inertia('{$modelName}/Create');
            }

            public function store(Store{$modelName}Request \$request) {
                if (\$this->ajax()) {
                    return \$this->{$modelNameCamel}Service->create(\$request->validated());
                }
            }

            public function show({$modelName} \${$modelNameCamel}) {
                \$data = {$modelName}Resource::make(\${$modelNameCamel});

                if (\$this->ajax()) {
                    return \$data;
                }

                return inertia('{$modelName}/Show', compact('data'));
            }

            public function edit({$modelName} \${$modelNameCamel}) {
                \$data = {$modelName}Resource::make(\${$modelNameCamel});

                return inertia('{$modelName}/Edit', compact('data'));
            }

            public function update(Update{$modelName}Request \$request, {$modelName} \${$modelNameCamel}) {
                if (\$this->ajax()) {
                    return \$this->{$modelNameCamel}Service->update(\${$modelNameCamel}, \$request->validated());
                }
            }

            public function destroy({$modelName} \${$modelNameCamel}) {
                if (\$this->ajax()) {
                    return \$this->{$modelNameCamel}Service->delete(\${$modelNameCamel});
                }
            }
        }
        PHP;
    }

    protected function getApiControllerTemplate(): string {
        $modelName = self::$model->studly;
        $modelNameCamel = self::$model->camel;

        return <<<PHP
    <?php

    namespace App\Http\Controllers\Api;

    use App\Http\Requests\\{$modelName}\Store{$modelName}Request;
    use App\Http\Requests\\{$modelName}\Update{$modelName}Request;
    use App\Http\Resources\\{$modelName}Resource;
    use App\Models\\{$modelName};
    use App\Support\Interfaces\Services\\{$modelName}ServiceInterface;
    use Illuminate\Http\Request;

    class Api{$modelName}Controller extends ApiController {
        public function __construct(
            protected {$modelName}ServiceInterface \${$modelNameCamel}Service
        ) {}

        /**
         * Display a listing of the resource.
         */
        public function index(Request \$request) {
            \$perPage = request()->get('perPage', 5);

            return {$modelName}Resource::collection(\$this->{$modelNameCamel}Service->getAllPaginated(\$request->query(), \$perPage));
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Store{$modelName}Request \$request) {
            return \$this->{$modelNameCamel}Service->create(\$request->validated());
        }

        /**
         * Display the specified resource.
         */
        public function show({$modelName} \${$modelNameCamel}) {
            return new {$modelName}Resource(\${$modelNameCamel}->load(['roles' => ['division', 'permissions']]));
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Update{$modelName}Request \$request, {$modelName} \${$modelNameCamel}) {
            return \$this->{$modelNameCamel}Service->update(\${$modelNameCamel}, \$request->validated());
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Request \$request, {$modelName} \${$modelNameCamel}) {
            return \$this->{$modelNameCamel}Service->delete(\${$modelNameCamel});
        }
    }
    PHP;
    }

    protected function getStoreRequestTemplate(): string {
        $modelName = self::$model->studly;

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

    protected function getUpdateRequestTemplate(): string {
        $modelName = self::$model->studly;

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

    protected function getResourceTemplate(): string {
        $modelName = self::$model->studly;

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

    protected function getControllerTestTemplate(): string {
        $modelName = self::$model->studly;
        $modelRoute = self::$model->kebabPlural;
        $databaseTable = Str::plural(self::$model->snake);

        return <<<PHP
    <?php

    test('index method returns paginated {$modelRoute}', function () {
        \$this->dummy->create{$modelName}();

        \$response = actAsSuperAdmin()->getJson('/{$modelRoute}?page=1&perPage=5');

        \$response->assertStatus(200)
            ->assertJsonStructure(['data', 'meta'])
            ->assertJsonCount(1, 'data');
    });

    test('create method returns create page', function () {

        \$response = actAsSuperAdmin()->get('/{$modelRoute}/create');

        \$response->assertStatus(200)
            ->assertInertia(fn (\$assert) => \$assert->component('{$modelName}/Create'));
    });

    test('store method creates new {$modelName}', function () {
        \$data = [
            'name' => 'Test name',
        ];

        \$response = actAsSuperAdmin()->postJson('/{$modelRoute}', \$data);

        \$response->assertStatus(201)
            ->assertJsonStructure(['id', 'name']);
        \$this->assertDatabaseHas('{$databaseTable}', \$data);
    });

    test('show method returns {$modelName} details', function () {
        \$model = \$this->dummy->create{$modelName}();

        \$response = actAsSuperAdmin()->getJson("/{$modelRoute}/{\$model->id}");

        \$response->assertStatus(200)
            ->assertJson(['id' => \$model->id, 'name' => \$model->name]);
    });

    test('edit method returns edit page', function () {
        \$model = \$this->dummy->create{$modelName}();

        \$response = actAsSuperAdmin()->get("/{$modelRoute}/{\$model->id}/edit");

        \$response->assertStatus(200)
            ->assertInertia(fn (\$assert) => \$assert->component('{$modelName}/Edit'));
    });

    test('update method updates {$modelName}', function () {
        \$model = \$this->dummy->create{$modelName}();
        \$updatedData = [
            'name' => 'Updated name',
        ];

        \$response = actAsSuperAdmin()->putJson("/{$modelRoute}/{\$model->id}", \$updatedData);

        \$response->assertStatus(200)
            ->assertJson(\$updatedData);
        \$this->assertDatabaseHas('{$databaseTable}', \$updatedData);
    });

    test('destroy method deletes {$modelName}', function () {
        \$model = \$this->dummy->create{$modelName}();

        \$response = actAsSuperAdmin()->deleteJson("/{$modelRoute}/{\$model->id}");

        \$response->assertStatus(204);
        \$this->assertDatabaseMissing('{$databaseTable}', ['id' => \$model->id]);
    });
    PHP;
    }

    protected function getApiControllerTestTemplate(): string {
        $modelName = self::$model->studly;
        $modelNameCamel = self::$model->camel;
        $modelNamePlural = Str::plural($modelNameCamel);
        $databaseTable = Str::plural(self::$model->snake);

        return <<<PHP
    <?php

    test('index method returns paginated {$modelNamePlural}', function () {
        \$this->dummy->create{$modelName}();

        \$response = actAsSuperAdmin()->getJson('/api/{$modelNamePlural}?page=1&perPage=5');

        \$response->assertStatus(200)
            ->assertJsonStructure(['data', 'meta'])
            ->assertJsonCount(1, 'data');
    });

    test('create method returns create page', function () {

        \$response = actAsSuperAdmin()->get('/api/{$modelNamePlural}/create');

        \$response->assertStatus(200)
            ->assertInertia(fn (\$assert) => \$assert->component('{$modelName}/Create'));
    });

    test('store method creates new {$modelNameCamel}', function () {
        \$data = [
            'name' => 'Test name',
        ];

        \$response = actAsSuperAdmin()->postJson('/api/{$modelNamePlural}', \$data);

        \$response->assertStatus(201)
            ->assertJsonStructure(['id', 'name']);
        \$this->assertDatabaseHas('{$databaseTable}', \$data);
    });

    test('show method returns {$modelNameCamel} details', function () {
        \$model = \$this->dummy->create{$modelName}();

        \$response = actAsSuperAdmin()->getJson("/api/{$modelNamePlural}/{\$model->id}");

        \$response->assertStatus(200)
            ->assertJson(['id' => \$model->id, 'name' => \$model->name]);
    });

    test('edit method returns edit page', function () {
        \$model = \$this->dummy->create{$modelName}();

        \$response = actAsSuperAdmin()->get("/api/{$modelNamePlural}/{\$model->id}/edit");

        \$response->assertStatus(200)
            ->assertInertia(fn (\$assert) => \$assert->component('{$modelName}/Edit'));
    });

    test('update method updates {$modelNameCamel}', function () {
        \$model = \$this->dummy->create{$modelName}();
        \$updatedData = [
            'name' => 'Updated name',
        ];

        \$response = actAsSuperAdmin()->putJson("/api/{$modelNamePlural}/{\$model->id}", \$updatedData);

        \$response->assertStatus(200)
            ->assertJson(\$updatedData);
        \$this->assertDatabaseHas('{$databaseTable}', \$updatedData);
    });

    test('destroy method deletes {$modelNameCamel}', function () {
        \$model = \$this->dummy->create{$modelName}();

        \$response = actAsSuperAdmin()->deleteJson("/api/{$modelNamePlural}/{\$model->id}");

        \$response->assertStatus(204);
        \$this->assertDatabaseMissing('{$databaseTable}', ['id' => \$model->id]);
    });
    PHP;
    }

    protected function getFrontendModelInterfaceTemplate(): string {
        $modelName = self::$model->studly;

        return <<<TS
        export interface {$modelName} {
            id: number;
            created_at: string;
            updated_at: string;
        }
        TS;
    }

    protected function getFrontendResourceTemplate(): string {
        $modelName = self::$model->studly;

        return <<<TS
        import { {$modelName} } from '@/Support/Interfaces/Models';
        import { Resource } from '@/Support/Interfaces/Resources';

        export interface {$modelName}Resource extends Resource, {$modelName} {}
        TS;
    }

    protected function getFrontendServiceTemplate(): string {

        $routeName = self::$model->upperSnake . 'S';
        $modelName = self::$model->studly;
        $modelCamel = self::$model->camel;

        return <<<TS
        import { ROUTES } from '@/Support/Constants/routes';
        import { serviceFactory } from '@/Services/serviceFactory';
        import { {$modelName}Resource } from '@/Support/Interfaces/Resources';

        export const {$modelCamel}Service = {
            ...serviceFactory<{$modelName}Resource>(ROUTES.{$routeName}),
            customFunctionExample: async () => {
                console.log('custom function');
            },
        };
        TS;
    }

    /**
     * @throws FileNotFoundException
     */
    protected function appendFrontendModelInterface(): void {
        $modelName = self::$model->studly;
        $scriptExtension = self::$frontEndExtensions->value;
        $modelInterfacePath = resource_path("js/Support/Interfaces/Models/index{$scriptExtension}");
        $modelInterfaceContent = File::get($modelInterfacePath);

        if (!str_contains($modelInterfaceContent, "export * from './{$modelName}';")) {
            $modelInterfaceContent .= "\nexport * from './{$modelName}';";
            File::put($modelInterfacePath, $modelInterfaceContent);
        } else {
            $this->warn("{$modelName} interface already appended");
        }
    }

    /**
     * @throws FileNotFoundException
     */
    protected function appendFrontendResource(): void {
        $modelName = self::$model->studly;
        $scriptExtension = self::$frontEndExtensions->value;
        $resourceInterfacePath = resource_path("js/Support/Interfaces/Resources/index{$scriptExtension}");
        $resourceInterfaceContent = File::get($resourceInterfacePath);

        if (!str_contains($resourceInterfaceContent, "export * from './{$modelName}Resource';")) {
            $resourceInterfaceContent .= "\nexport * from './{$modelName}Resource';";
            File::put($resourceInterfacePath, $resourceInterfaceContent);
        } else {
            $this->warn("{$modelName}Resource interface already appended");
        }
    }

    /**
     * @throws FileNotFoundException
     */
    protected function appendFrontendModelToRoutes(): void {
        $modelUpperSnake = self::$model->upperSnake;
        $modelDashed = self::$model->kebab;
        $scriptExtension = self::$frontEndExtensions->value;
        $routesPath = resource_path("js/Support/Constants/routes{$scriptExtension}");
        $routesContent = File::get($routesPath);
        $routePostfix = 'S';
        $routePostfixLower = Str::lower($routePostfix);

        // Check if the route is already defined to avoid duplicates
        if (!str_contains($routesContent, "{$modelUpperSnake}{$routePostfix}")) {
            // Append the new route at the end of the ROUTES object
            $routesContent = str_replace('};', "\t{$modelUpperSnake}{$routePostfix}: '{$modelDashed}{$routePostfixLower}',\n};", $routesContent);

            // Write back the updated content to the routes file
            File::put($routesPath, $routesContent);
        } else {
            $this->warn("Route {$modelUpperSnake}{$routePostfix} already exists.");
        }
    }
}
