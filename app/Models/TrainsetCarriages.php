<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainsetCarriages extends Model
{
    use HasFactory;

    protected $fillable = [
        'trainset_id',
        'carriage_id',
        'qty',
    ];

    // public function carriage(): BelongsTo
    // {
    //     return $this->belongsTo(Trainset::class);
    // }

    // public function trainset(): BelongsTo
    // {
    //     return $this->belongsTo(Carriage::class);
    // }
}
