<?php

namespace App\Support\Interfaces;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Database\Eloquent\Model;

interface UserServiceInterface extends BaseCrudServiceInterface {

    /**
     * Update a user's password via API.
     *
     * @param $user
     * @param array $data
     * @return void
     */
    public function apiUpdatePassword($user, array $data): ?Model;
}
