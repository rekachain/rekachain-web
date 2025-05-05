<?php

namespace App\Services;

use App\Support\Interfaces\Repositories\ProductProblemRepositoryInterface;
use App\Support\Interfaces\Services\ProductProblemServiceInterface;
use App\Traits\Services\HandlesImages;
use Illuminate\Database\Eloquent\Model;

class ProductProblemService extends BaseCrudService implements ProductProblemServiceInterface {
    use HandlesImages;

    protected string $imagePath = 'product_problems/images';

    protected function getRepositoryClass(): string {
        return ProductProblemRepositoryInterface::class;
    }

    public function update($keyOrModel, array $data): ?Model {
        $data = $this->handleImageUpload($data);

        return parent::update($keyOrModel, $data);
    }

    public function updateWithNote($keyOrModel, array $data): ?Model {
        $productProblem = $this->update($keyOrModel, $data);
        $productProblem->product_problem_notes()->create([
            'user_id' => auth()->id(),
            'note' => $data['note'],
        ]);

        return $productProblem;
    }

    public function delete($keyOrModel): bool {
        $keyOrModel->product_problem_notes()->delete();

        return parent::delete($keyOrModel);
    }
}
