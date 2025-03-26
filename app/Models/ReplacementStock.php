<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReplacementStock extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'component_id',
        'threshold',
        'qty',
    ];
    protected $filterable = [
        'searchs' => [
            'qty',
        ],
        'columns' => [],
        'relation_searchs' => [
            'component' => [
                'name',
                'description',
            ],
        ],
    ];

    public function component(): BelongsTo {
        return $this->belongsTo(Component::class);
    }
}
