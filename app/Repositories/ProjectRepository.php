<?php

namespace App\Repositories;

use App\Models\Project;
use App\Support\Interfaces\Repositories\ProjectRepositoryInterface;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface {
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

    public function delete($keyOrModel): bool {
        foreach ($keyOrModel->trainsets as $trainset) {
            if ($trainset->carriages()->exists()) {
                // Optionally, you can throw an exception or return false
                return false;
            }
        }

        $keyOrModel->trainsets->each(function ($trainset) {
            $trainset->carriages->each(function ($carriage) {
                $carriage->carriage_panels->each(function ($carriagePanel) {
                    $carriagePanel->components->each(function ($component) {
                        $component->delete();
                    });
                    $carriagePanel->delete();
                });
                $carriage->delete();
            });
            $trainset->delete();
        });

        return parent::delete($keyOrModel);
    }

    protected function getModelClass(): string {
        return Project::class;
    }
}
