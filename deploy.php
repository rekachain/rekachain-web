<?php

namespace Deployer;

require 'recipe/laravel.php';
require 'contrib/npm.php';
require 'contrib/rsync.php';

// Config

set('repository', getenv('REPOSITORY'));
set('keep_releases', 3);

set('rsync_src', function () {
    return __DIR__;
});

// Configuring the rsync exclusions
// You'll want to exclude anything that you don't want on the production server
add('rsync', [
    'exclude' => [
        '.git/',
        'vendor/',
        'node_modules/',
        '.github/',
        'deploy.php',
    ],
]);

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

task('deploy:secrets', function () {
    file_put_contents(__DIR__ . '/.env', getenv('DOT_ENV'));
    upload('.env', get('deploy_path') . '/shared');
});

// Hosts

host('prod')
    ->set('remote_user', getenv('REMOTE_USER'))
    ->setHostname(getenv('REMOTE_HOST'))
    ->set('deploy_path', getenv('DEPLOY_PATH'));

// Hooks

after('deploy:failed', 'deploy:unlock');

task('deploy', [
    'deploy:prepare',
    'rsync',
    'deploy:secrets',
    'deploy:vendors',
    'deploy:shared',
    'artisan:storage:link',
    'artisan:view:cache',
    'artisan:config:cache',
    'artisan:migrate',
    'deploy:publish',
]);

desc('End of application deployment');
