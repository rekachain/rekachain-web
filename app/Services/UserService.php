<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\UserRepositoryInterface;
use App\Support\Interfaces\UserServiceInterface;
use Illuminate\Database\Eloquent\Model;

class UserService extends BaseCrudService implements UserServiceInterface {
    private $photoPath = 'users/photos';

    public function create(array $data): ?Model {
        $data = $this->handlePhotoUpload($data);

        $user = parent::create($data);

        if (isset($data['role_id'])) {
            $user->roles()->sync($data['role_id']);
        }

        return $user;
    }

    public function update($keyOrModel, array $data): ?Model {
        $data = $this->handlePhotoUpload($data, $keyOrModel);

        if (isset($data['role_id'])) {
            $keyOrModel->roles()->sync($data['role_id']);
        }

        return parent::update($keyOrModel, $data);
    }

    public function delete($keyOrModel): bool {
        $this->deletePhoto($keyOrModel);

        return parent::delete($keyOrModel);
    }

    private function handlePhotoUpload(array $data, $keyOrModel = null): array {
        if (request()->hasFile('photo')) {
            if ($keyOrModel && $keyOrModel->photo) {
                $this->deletePhoto($keyOrModel);
            }
            $data['photo'] = request()->file('photo')->store($this->photoPath, 'public');
        }

        return $data;
    }

    private function deletePhoto($keyOrModel): void {
        if ($keyOrModel->photo) {
            unlink(storage_path('app/public/' . $keyOrModel->photo));
        }
    }

    protected function getRepositoryClass(): string {
        return UserRepositoryInterface::class;
    }
}
