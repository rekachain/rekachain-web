<?php

namespace App\Models;

use App\Support\Enums\ProductProblemCauseEnum;
use App\Support\Enums\ProductProblemStatusEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductProblem extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'returned_product_id',
        'component_id',
        'qty',
        'cause',
        'status',
        'image_path',
        'created_at',
        'updated_at',
    ];
    protected $casts = [
        'status' => ProductProblemStatusEnum::class,
        'cause' => ProductProblemCauseEnum::class,
    ];
    protected $filterable = [
        'searchs' => [],
        'columns' => [
            'returned_product_id',
            'component_id',
            'status',
            'cause',
        ],
        'relation_searchs' => [
            'component' => [
                'name',
                'description',
            ],
        ],
    ];

    public function returned_product(): BelongsTo {
        return $this->belongsTo(ReturnedProduct::class);
    }

    public function component(): BelongsTo {
        return $this->belongsTo(Component::class);
    }

    public function product_problem_notes(): HasMany {
        return $this->hasMany(ProductProblemNote::class);
    }

    public function getImageAttribute() {
        return $this->image_path ? asset('storage/' . $this->image_path) : asset('assets/images/no-image.png');
    }
}
