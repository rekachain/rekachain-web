<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Step extends Model
{
    use HasFactory;

    protected $fillable = [
        'progress_id',
        'name',
        'process',
        'estimated_time'
    ];

    public function progress(): BelongsTo
    {
        return $this->belongsTo(Progress::class);
    }
}