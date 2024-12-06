<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgressStep extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'progress_id',
        'step_id',
    ];

    protected $filterable = [
        'columns' => [
            'progress_id',
            'step_id',
        ],
    ];

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }

    public function step(): BelongsTo {
        return $this->belongsTo(Step::class);
    }
}
