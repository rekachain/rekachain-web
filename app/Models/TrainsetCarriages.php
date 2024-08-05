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

    public function ts_car(): BelongsTo
    {
        return $this->belongsTo(Trainset::class, 'id_trainset', 'id_trainset');
    }

    public function car_ts(): BelongsTo
    {
        return $this->belongsTo(Carriage::class, 'id_carriage', 'id_carriage');
    }
}
