<?php

// Helper function to count files in a directory, excluding specified files or folders
function countFilesInDirectory(string $dir, array $excluded = []): int {
    $iterator = new FilesystemIterator($dir, FilesystemIterator::SKIP_DOTS);
    $filteredIterator = new CallbackFilterIterator($iterator, function ($file) use ($excluded) {
        if ($file->isDir()) {
            return !in_array($file->getFilename(), $excluded);
        }

        return !in_array($file->getFilename(), $excluded);
    });

    $totalFileCount = 0;
    foreach ($filteredIterator as $file) {
        if ($file->isDir()) {
            $filesInFolder = new FilesystemIterator($file->getPathname(), FilesystemIterator::SKIP_DOTS);
            $totalFileCount += iterator_count($filesInFolder);
        } else {
            $totalFileCount++;
        }
    }

    return $totalFileCount;
}

// Test that models have corresponding controllers
test('models should have corresponding controllers', function () {
    $baseDir = realpath(__DIR__ . '/../../'); // Adjust to get the project root directory
    $modelDir = $baseDir . '/app/Models';
    $controllerDir = $baseDir . '/app/Http/Controllers';

    $modelFiles = new FilesystemIterator($modelDir, FilesystemIterator::SKIP_DOTS);
    $modelsWithoutControllers = [];

    foreach ($modelFiles as $modelFile) {
        if ($modelFile->isFile()) {
            $modelName = pathinfo($modelFile->getFilename(), PATHINFO_FILENAME);
            $controllerPattern = '/^' . preg_quote($modelName, '/') . "Controller\.php$/";
            $controllerExists = false;

            $controllerFiles = new FilesystemIterator($controllerDir, FilesystemIterator::SKIP_DOTS);
            foreach ($controllerFiles as $controllerFile) {
                if (preg_match($controllerPattern, $controllerFile->getFilename())) {
                    $controllerExists = true;
                    break;
                }
            }

            if (!$controllerExists) {
                $modelsWithoutControllers[] = $modelName;
            }
        }
    }

    dump('Models without controllers: ', $modelsWithoutControllers);
    expect($modelsWithoutControllers)->toBeEmpty();
});
test('models should have corresponding form requests', function () {
    $baseDir = realpath(__DIR__ . '/../../'); // Adjust to get the project root directory
    $modelDir = $baseDir . '/app/Models';
    $requestBaseDir = $baseDir . '/app/Http/Requests';

    $modelFiles = new FilesystemIterator($modelDir, FilesystemIterator::SKIP_DOTS);
    $modelsWithoutRequests = [];

    foreach ($modelFiles as $modelFile) {
        if ($modelFile->isFile()) {
            $modelName = pathinfo($modelFile->getFilename(), PATHINFO_FILENAME);
            $storeRequestPath = $requestBaseDir . '/' . $modelName . '/Store' . $modelName . 'Request.php';
            $updateRequestPath = $requestBaseDir . '/' . $modelName . '/Update' . $modelName . 'Request.php';

            if (!file_exists($storeRequestPath) || !file_exists($updateRequestPath)) {
                $modelsWithoutRequests[] = $modelName;
            }
        }
    }

    dump('Models without requests: ', $modelsWithoutRequests);
    expect($modelsWithoutRequests)->toBeEmpty();
});

test('models should have corresponding resources', function () {
    $baseDir = realpath(__DIR__ . '/../../'); // Adjust to get the project root directory
    $modelDir = $baseDir . '/app/Models';
    $resourceDir = $baseDir . '/app/Http/Resources';

    $modelFiles = new FilesystemIterator($modelDir, FilesystemIterator::SKIP_DOTS);
    $modelsWithoutResources = [];

    foreach ($modelFiles as $modelFile) {
        if ($modelFile->isFile()) {
            $modelName = pathinfo($modelFile->getFilename(), PATHINFO_FILENAME);
            $resourcePattern = '/^' . preg_quote($modelName, '/') . "Resource\.php$/";
            $resourceExists = false;

            $resourceFiles = new FilesystemIterator($resourceDir, FilesystemIterator::SKIP_DOTS);
            foreach ($resourceFiles as $resourceFile) {
                if (preg_match($resourcePattern, $resourceFile->getFilename())) {
                    $resourceExists = true;
                    break;
                }
            }

            if (!$resourceExists) {
                $modelsWithoutResources[] = $modelName;
            }
        }
    }

    dump('Models without resources: ', $modelsWithoutResources);
    expect($modelsWithoutResources)->toBeEmpty();
});

test('models should have corresponding services and repositories interface', function () {
    $baseDir = realpath(__DIR__ . '/../../'); // Adjust to get the project root directory
    $modelDir = $baseDir . '/app/Models';
    $serviceInterfaceDir = $baseDir . '/app/Support/Interfaces/Services';
    $repositoryInterfaceDir = $baseDir . '/app/Support/Interfaces/Repositories';
    $serviceDir = $baseDir . '/app/Services';
    $repositoryDir = $baseDir . '/app/Repositories';

    $modelFiles = new FilesystemIterator($modelDir, FilesystemIterator::SKIP_DOTS);
    $modelsWithoutServices = [];
    $modelsWithoutRepositories = [];

    foreach ($modelFiles as $modelFile) {
        if ($modelFile->isFile()) {
            $modelName = pathinfo($modelFile->getFilename(), PATHINFO_FILENAME);
            $serviceInterfacePath = $serviceInterfaceDir . '/' . $modelName . 'ServiceInterface.php';
            $repositoryInterfacePath = $repositoryInterfaceDir . '/' . $modelName . 'RepositoryInterface.php';
            $servicePath = $serviceDir . '/' . $modelName . 'Service.php';
            $repositoryPath = $repositoryDir . '/' . $modelName . 'Repository.php';

            if (!file_exists($serviceInterfacePath) || !file_exists($repositoryInterfacePath) || !file_exists($servicePath) || !file_exists($repositoryPath)) {
                if (!file_exists($serviceInterfacePath)) {
                    $modelsWithoutServices[] = $modelName;
                }

                if (!file_exists($repositoryInterfacePath)) {
                    $modelsWithoutRepositories[] = $modelName;
                }
            }
        }
    }

    dump('Models without services interface: ', $modelsWithoutServices);
    dump('Models without repositories interface: ', $modelsWithoutRepositories);
    expect($modelsWithoutServices)->toBeEmpty()
        ->and($modelsWithoutRepositories)->toBeEmpty();
});

test('models should have corresponding services and repositories', function () {
    $baseDir = realpath(__DIR__ . '/../../'); // Adjust to get the project root directory
    $modelDir = $baseDir . '/app/Models';
    $serviceDir = $baseDir . '/app/Services';
    $repositoryDir = $baseDir . '/app/Repositories';

    $modelFiles = new FilesystemIterator($modelDir, FilesystemIterator::SKIP_DOTS);
    $modelsWithoutServices = [];
    $modelsWithoutRepositories = [];

    foreach ($modelFiles as $modelFile) {
        if ($modelFile->isFile()) {
            $modelName = pathinfo($modelFile->getFilename(), PATHINFO_FILENAME);
            $servicePath = $serviceDir . '/' . $modelName . 'Service.php';
            $repositoryPath = $repositoryDir . '/' . $modelName . 'Repository.php';

            if (!file_exists($servicePath) || !file_exists($repositoryPath)) {
                if (!file_exists($servicePath)) {
                    $modelsWithoutServices[] = $modelName;
                }

                if (!file_exists($repositoryPath)) {
                    $modelsWithoutRepositories[] = $modelName;
                }
            }
        }
    }

    dump('Models without services: ', $modelsWithoutServices);
    dump('Models without repositories: ', $modelsWithoutRepositories);
    expect($modelsWithoutServices)->toBeEmpty()
        ->and($modelsWithoutRepositories)->toBeEmpty();
});

// Test that models have corresponding controllers, form requests, resources, services, and repositories
test('model should have controllers, form request, resource, service interface, repository interface, service, and repository', function () {
    $baseDir = realpath(__DIR__ . '/../../'); // Adjust to get the project root directory

    $modelDir = $baseDir . '/app/Models';
    $controllerDir = $baseDir . '/app/Http/Controllers';
    $requestDir = $baseDir . '/app/Http/Requests';
    $resourceDir = $baseDir . '/app/Http/Resources';

    // Exclude certain folders or files
    $excludedControllers = ['Api', 'Auth', 'Controller.php', 'ProfileController.php'];
    $excludedRequests = ['Auth', 'ApiAuthLoginRequest.php', 'ProfileUpdateRequest.php'];

    // Count files in each directory
    $modelCount = countFilesInDirectory($modelDir);
    $controllerCount = countFilesInDirectory($controllerDir, $excludedControllers);
    $requestCount = countFilesInDirectory($requestDir, $excludedRequests);
    $resourceCount = countFilesInDirectory($resourceDir);
    $serviceInterfaceCount = countFilesInDirectory($baseDir . '/app/Support/Interfaces/Services');
    $repositoryInterfaceCount = countFilesInDirectory($baseDir . '/app/Support/Interfaces/Repositories');
    $serviceCount = countFilesInDirectory($baseDir . '/app/Services');
    $repositoryCount = countFilesInDirectory($baseDir . '/app/Repositories');

    dump('modelCount: ' . $modelCount);
    dump('controllerCount: ' . $controllerCount);
    dump('requestCount: ' . $requestCount);
    dump('resourceCount: ' . $resourceCount);
    dump('serviceInterfaceCount: ' . $serviceInterfaceCount);
    dump('repositoryInterfaceCount: ' . $repositoryInterfaceCount);
    dump('serviceCount: ' . $serviceCount);
    dump('repositoryCount: ' . $repositoryCount);

    // Assert counts
    $this->assertEquals($modelCount, $controllerCount);
    $this->assertEquals($modelCount, $resourceCount);
    $this->assertEquals($modelCount * 2, $requestCount);
    $this->assertEquals($modelCount, $serviceInterfaceCount);
    $this->assertEquals($modelCount, $repositoryInterfaceCount);
    $this->assertEquals($modelCount, $serviceCount);
    $this->assertEquals($modelCount, $repositoryCount);
});