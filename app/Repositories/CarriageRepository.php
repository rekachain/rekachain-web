<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Carriage;
use App\Support\Interfaces\CarriageRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class CarriageRepository extends BaseRepository implements CarriageRepositoryInterface {
    protected function getModelClass(): string {
        return Carriage::class;
    }
    // Berjaga jaga apabila ada upload dokumen

    // public function create(array $data): ?Model {
    //     if (request()->hasFile('photo')) {
    //         $data['photo'] = request()->file('photo')->store('users/photos', 'public');
    //     }

    //     return parent::create($data);
    // }

    // public function update($keyOrModel, array $data): ?Model {
    //     if (request()->hasFile('photo')) {
    //         if ($keyOrModel->photo) {
    //             unlink(storage_path('app/public/' . $keyOrModel->photo));
    //         }
    //         $data['photo'] = request()->file('photo')->store('users/photos', 'public');
    //     }

    //     return parent::update($keyOrModel, $data);
    // }

    // public function delete($keyOrModel): bool {
    //     if ($keyOrModel->photo) {
    //         unlink(storage_path('app/public/' . $keyOrModel->photo));
    //     }

    //     return parent::delete($keyOrModel);
    // }

    // protected function getModelClass(): string {
    //     return User::class;
    // }
}
