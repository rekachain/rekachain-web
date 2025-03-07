<?php

namespace App\Models;

use App\Support\Enums\ProductProblemStatusEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductProblem extends Model
{
    use HasFactory, HasFilterable;

    protected $fillable = [
        'returned_product_id',
        'component_id',
        'status',
    ];

    protected $casts = [
        'status' => ProductProblemStatusEnum::class,
    ];

    protected $filterable = [
        'searchs' => [
            'status',
        ],
        'columns' => [
            'component_id',
            'status',
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
}
