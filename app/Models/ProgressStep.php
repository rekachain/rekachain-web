<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProgressStep extends Model {
    use HasFactory;

    protected $fillable = [
        'progress_id',
        'step_id',
    ];

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }

    public function step(): BelongsTo {
        return $this->belongsTo(Step::class);
    }
}
