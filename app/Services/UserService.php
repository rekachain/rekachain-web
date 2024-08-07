<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\UserRepositoryInterface;
use App\Support\Interfaces\UserServiceInterface;
use App\Traits\Services\HandlesImages;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService extends BaseCrudService implements UserServiceInterface {
    use HandlesImages;

    protected $imagePath = 'users/images';

    public function create(array $data): ?Model {
        $data = $this->handleImageUpload($data);

        $user = parent::create($data);

        if (isset($data['role_id'])) {
            $user->roles()->sync($data['role_id']);
        }

        return $user;
    }

    public function update($keyOrModel, array $data): ?Model {
        $data = $this->handleImageUpload($data, $keyOrModel);

        if (isset($data['role_id'])) {
            $keyOrModel->roles()->sync($data['role_id']);
        }

        return parent::update($keyOrModel, $data);
    }

    public function apiUpdatePassword($user, array $data): ?Model {
        // Validate the old password
        if (!Hash::check($data['old_password'], $user->password)) {

            throw ValidationException::withMessages([
                'old_password' => [trans('validation.old_password.mismatch')],
            ]);
        }

        return $this->update($user, [
            'password' => $data['new_password'],
        ]);
    }

    public function delete($keyOrModel): bool {
        $this->deleteImage($keyOrModel->image_path);

        return parent::delete($keyOrModel);
    }

    protected function getRepositoryClass(): string {
        return UserRepositoryInterface::class;
    }
}
