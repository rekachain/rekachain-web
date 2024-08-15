<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\Project;
use App\Support\Interfaces\ProjectRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface {
    
    protected function getModelClass(): string {
        return Project::class;
    }
    // Berjaga jaga apabila ada upload dokumen

    public function create(array $data): ?Model {
        return parent::create($data);
    }

    public function update($keyOrModel, array $data): ?Model {
        return parent::update($keyOrModel, $data);
    }

    // public function delete($keyOrModel): bool {
    //     if ($keyOrModel->photo) {
    //         unlink(storage_path('app/public/' . $keyOrModel->photo));
    //     }

    //     return parent::delete($keyOrModel);
    // }

     protected function applyFilters(array $searchParams = []): Builder
     {
        $query = $this->getQuery();

        if (isset($searchParams['orderBy'])) {
            $query->orderBy($searchParams['orderBy'],$searchParams['sortBy'] ?? 'desc');
        }

        return $query;
     }

}
