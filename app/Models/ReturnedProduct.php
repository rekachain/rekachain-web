<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ReturnedProduct extends Model
{
    use HasFactory, HasFilterable;

    protected $fillable = [
        'buyer_id',
        'qty',
        'serial_number',
    ];
    protected $filterable = [
        'searchs' => [],
        'columns' => [
            'product_returnable_type',
        ],
        'relation_searchs' => [
            'buyer' => [
                'name',
            ],
            'product_returnable' => [
                'name',
            ],
        ],
    ];

    public function buyer(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function product_returnable(): MorphTo {
        return $this->morphTo();
    }
}
