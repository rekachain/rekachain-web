<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Panel extends Model {
    use HasFactory;

    protected $fillable = [
        'progress_id',
        'carriage_id',
        'name',
    ];

    public function carriage(): BelongsTo {
        return $this->belongsTo(Carriage::class);
    }

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }
}
