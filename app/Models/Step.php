<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Step extends Model {
    use HasFactory;

    protected $fillable = [
        'progress_id',
        'name',
        'process',
        'estimated_time',
    ];

    public function progress(): BelongsTo {
        return $this->belongsTo(Progress::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    //    public function completion_proof() {}

    //    public function detail_worker(): BelongsTo {}

    public function canBeDeleted() {
        return true;
    }
}
