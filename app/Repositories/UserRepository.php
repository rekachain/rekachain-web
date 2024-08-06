<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\User;
use App\Support\Interfaces\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository implements UserRepositoryInterface {
    public function create(array $data): ?Model {

        if (request()->hasFile('photo')) {
            $data['photo'] = request()->file('photo')->store('users/photos', 'public');
        }

        $user = parent::create($data);

        if (isset($data['role_id'])) {
            $user->roles()->sync($data['role_id']);
        }

        return $user;
    }

    public function update($keyOrModel, array $data): ?Model {

        if (isset($data['role_id'])) {
            $keyOrModel->roles()->sync($data['role_id']);
        }

        if (request()->hasFile('photo')) {
            if ($keyOrModel->photo) {
                unlink(storage_path('app/public/' . $keyOrModel->photo));
            }
            $data['photo'] = request()->file('photo')->store('users/photos', 'public');
        }

        return parent::update($keyOrModel, $data);
    }

    public function delete($keyOrModel): bool {
        if ($keyOrModel->photo) {
            unlink(storage_path('app/public/' . $keyOrModel->photo));
        }

        return parent::delete($keyOrModel);
    }

    protected function getModelClass(): string {
        return User::class;
    }
}
