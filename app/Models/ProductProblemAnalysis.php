<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductProblemAnalysis extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'component_name',
        'date_range',
        'summary',
        'cause',
        'solution',
    ];

    protected $filterable = [
        'searchs' => [
            'component_name',
            'date_range',
            'summary',
            'cause',
            'solution',
        ],
    ];
}
