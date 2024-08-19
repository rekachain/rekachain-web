<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Project;
use App\Support\Interfaces\ProjectRepositoryInterface;
use App\Traits\Repositories\HandlesSorting;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface {
    use HandlesSorting;
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

    protected function getModelClass(): string {
        return Project::class;
    }

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }
}
