<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductProblemNote extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'product_problem_id',
        'note',
        'user_id',
    ];
    protected $filterable = [
        'searchs' => [
            'note',
        ],
        'columns' => [
            'product_problem_id',
            'user_id',
        ],
        'relation_searchs' => [
            'user' => [
                'name',
            ],
        ],
    ];

    public function product_problem(): BelongsTo {
        return $this->belongsTo(ProductProblem::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
