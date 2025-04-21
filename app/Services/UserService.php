<?php

namespace App\Services;

use App\Models\User;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Repositories\UserRepositoryInterface;
use App\Support\Interfaces\Services\UserServiceInterface;
use App\Traits\Services\HandlesImages;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService extends BaseCrudService implements UserServiceInterface {
    use HandlesImages;

    protected string $imagePath = 'users/images';

    public function create(array $data): ?Model {
        $data = $this->handleImageUpload($data);

        /** @var User $user */
        $user = parent::create($data);

        if (request()->input('intent') === IntentEnum::WEB_USER_CREATE_BUYER->value) {
            $user->assignRole(RoleEnum::CUSTOMER->value);

            return $user;
        }

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
