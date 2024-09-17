<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgressStep extends Pivot {
    protected $fillable = [
        'progress_id',
        'step_id',
    ];

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }

    public function steps(): BelongsTo {
        return $this->belongsTo(Step::class);
    }
}