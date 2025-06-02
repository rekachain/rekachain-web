<?php

namespace App\Models;

use App\Support\Enums\ProductRestockStatusEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ProductRestock extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'returned_product_id',
        'product_restockable_id',
        'product_restockable_type',
        'project_id',
        'status',
    ];
    protected $filterable = [
        'searchs' => [],
        'columns' => [
            'product_restockable_type',
            'project_id',
            'status',
        ],
        'relation_searchs' => [
            'product_restockable' => [
                'name',
                'description',
            ],
        ],
    ];
    protected $casts = [
        'status' => ProductRestockStatusEnum::class,
    ];

    public function returned_product(): BelongsTo {
        return $this->belongsTo(ReturnedProduct::class);
    }

    public function product_restockable(): MorphTo {
        return $this->morphTo();
    }

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }

    public function projectDetailUrl(): ?string {
        if (!$this->project_id || $this->project->trainsets()->count() === 0) {
            return null;
        }

        return route('projects.trainsets.carriage-trainsets.index', ['project' => $this->project_id, 'trainset' => $this->project->trainsets()->first()->id]);
    }
}
