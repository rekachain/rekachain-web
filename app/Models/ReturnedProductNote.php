<?php

namespace App\Models;

use App\Support\Enums\ReturnedProductStatusEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnedProductNote extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'returned_product_id',
        'note',
        'applied_status',
        'user_id',
        'created_at',
        'updated_at',
    ];
    protected $filterable = [
        'searchs' => [
            'note',
        ],
        'columns' => [
            'returned_product_id',
            'user_id',
        ],
        'relation_searchs' => [
            'user' => [
                'name',
            ],
        ],
    ];
    protected $casts = [
        'applied_status' => ReturnedProductStatusEnum::class,
    ];

    public function returned_product(): BelongsTo {
        return $this->belongsTo(ReturnedProduct::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function canBeUpdated(): bool {
        return $this->created_at->diffInHours(now()) < 1;
    }
}
