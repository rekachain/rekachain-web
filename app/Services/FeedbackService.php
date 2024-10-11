<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\FeedbackRepositoryInterface;
use App\Support\Interfaces\Services\FeedbackServiceInterface;

class FeedbackService extends BaseCrudService implements FeedbackServiceInterface {
    protected function getRepositoryClass(): string {
        return FeedbackRepositoryInterface::class;
    }
}