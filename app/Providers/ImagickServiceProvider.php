<?php

namespace App\Providers;

use File;
use Illuminate\Support\ServiceProvider;
use Imagick;

class ImagickServiceProvider extends ServiceProvider {
    /**
     * Register services.
     */
    public function register(): void {
        File::exists(storage_path('app/temp/imagick')) ?: File::makeDirectory(storage_path('app/temp/imagick'), 0755, true);
        Imagick::setRegistry('temporary-path', storage_path('app/temp/imagick'));
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void {
        //
    }
}
