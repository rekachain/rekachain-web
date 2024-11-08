<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Project;
use App\Support\Interfaces\Repositories\ProjectRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting;
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

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['name', 'initial_date']);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
