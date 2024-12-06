<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Step extends Model {
    use HasFactory, HasFilterable;

    protected $fillable = [
        'name',
        'process',
        'estimated_time',
    ];
    protected $filterable = [
        'searchs' => [
            'name',
            'process',
        ],
        'columns' => [
            'name',
        ],
    ];

    public function progress_steps(): HasMany {
        return $this->hasMany(ProgressStep::class);
    }

    public function users(): HasMany {
        return $this->hasMany(User::class);
    }

    // public function user(): BelongsTo {
    //     return $this->belongsTo(User::class);
    // }

    //    public function completion_proof() {}

    //    public function detail_worker(): BelongsTo {}

    public function canBeDeleted() {
        return $this->progress_steps->isEmpty() && $this->users->isEmpty();
    }
}
