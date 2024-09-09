<?php

namespace App\Models;

use App\Support\Enums\WorkDayTimeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkDayTime extends Model {
    use HasFactory;

    protected $fillable = [
        'work_day_id',
        'start_time',
        'end_time',
        'status',
    ];
    protected $casts = [
        'status' => WorkDayTimeEnum::class,
    ];

    public function work_day(): BelongsTo {
        return $this->belongsTo(WorkDay::class);
    }
}
