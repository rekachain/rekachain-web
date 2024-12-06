<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FailedComponentManufacture extends Model {
    use HasFactory;

    protected $fillable = [
        'detail_worker_trainset_id',
        'notes',
        'total_failed',
    ];

    protected $filterable = [
        'searchs' => [
            'notes',
            'total_failed',
        ],
        'columns' => [
            'detail_worker_trainset_id',
        ],
    ];

    public function detail_worker_trainset(): BelongsTo {
        return $this->belongsTo(DetailWorkerTrainset::class);
    }
}
