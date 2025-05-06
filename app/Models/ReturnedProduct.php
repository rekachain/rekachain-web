<?php

namespace App\Models;

use App\Support\Enums\ReturnedProductStatusEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ReturnedProduct extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'product_returnable_id',
        'product_returnable_type',
        'buyer_id',
        'qty',
        'serial_panel_id',
        'serial_number',
        'project_name',
        'trainset_name',
        'carriage_type',
        'status',
        'image_path',
    ];
    protected $filterable = [
        'searchs' => [
            'serial_number',
            'project_name',
            'trainset_name',
            'carriage_type',
        ],
        'columns' => [
            'product_returnable_type',
            'buyer_id',
            'status',
        ],
        'relation_searchs' => [
            'buyer' => [
                'name',
            ],
            'product_returnable' => [
                'name',
                'description',
            ],
        ],
        'relation_columns' => [
            'returned_product_notes' => [
                'user_id',
            ],
        ],
    ];
    protected $casts = [
        'status' => ReturnedProductStatusEnum::class,
    ];

    public function buyer(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function product_returnable(): MorphTo {
        return $this->morphTo();
    }

    public function serial_panel(): BelongsTo {
        return $this->belongsTo(SerialPanel::class);
    }

    public function product_problems(): HasMany {
        return $this->hasMany(ProductProblem::class);
    }

    public function returned_product_notes(): HasMany {
        return $this->hasMany(ReturnedProductNote::class);
    }

    public function getImageAttribute() {
        return $this->image_path ? asset('storage/' . $this->image_path) : asset('assets/images/no-image.png');
    }
}
