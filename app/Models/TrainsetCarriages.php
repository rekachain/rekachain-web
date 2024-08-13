<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainsetCarriages extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_trainset',
        'id_carriage',
        'qty',
    ];

    public function carriage(): BelongsTo
    {
        return $this->belongsTo(Trainset::class, 'id_trainset', 'id');
    }

    public function trainset(): BelongsTo
    {
        return $this->belongsTo(Carriage::class, 'id_carriage', 'id');
    }

}
