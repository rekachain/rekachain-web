<?php

namespace App\Repositories;

use App\Models\HelpdeskContact;
use App\Support\Interfaces\Repositories\HelpdeskContactRepositoryInterface;

class HelpdeskContactRepository extends BaseRepository implements HelpdeskContactRepositoryInterface {
    protected function getModelClass(): string {
        return HelpdeskContact::class;
    }
}
