<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Database\Eloquent\Model;

interface UserServiceInterface extends BaseCrudServiceInterface {
    /**
     * Update a user's password via API.
     *
     * @return void
     */
    public function apiUpdatePassword($user, array $data): ?Model;
}
