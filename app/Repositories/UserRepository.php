<?php

namespace App\Repositories;

use App\Models\User;
use App\Support\Interfaces\Repositories\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface {
    protected function getModelClass(): string {
        return User::class;
    }
}
