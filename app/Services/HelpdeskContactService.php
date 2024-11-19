<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\HelpdeskContactRepositoryInterface;
use App\Support\Interfaces\Services\HelpdeskContactServiceInterface;

class HelpdeskContactService extends BaseCrudService implements HelpdeskContactServiceInterface {
    protected function getRepositoryClass(): string {
        return HelpdeskContactRepositoryInterface::class;
    }
}