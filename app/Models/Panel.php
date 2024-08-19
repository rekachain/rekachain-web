<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panel extends Model
{
    use HasFactory;



    protected $fillable = [
        'progress_id',
        'name',
    ];

    public function progress(): BelongsTo
    {
        return $this->belongsTo(Progress::class);
    }
}
