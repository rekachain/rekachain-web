<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductProblemAnalysis extends Model
{
    use HasFactory;

    protected $fillable = [
        'component_name',
        'date_range',
        'summary',
        'cause',
        'solution',
    ];
}
