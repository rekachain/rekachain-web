<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Imagick;

class ImagickServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        file_exists(storage_path('app/temp/imagick')) ?: mkdir(storage_path('app/temp/imagick'), 0755, true);
        Imagick::setRegistry('temporary-path', storage_path('app/temp/imagick'));
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
