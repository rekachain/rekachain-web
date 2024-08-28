<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WorkDayTime extends Model
{
    use HasFactory;

    public const STATUS_TYPES = [
        'work',
        'break'
    ];

    protected $fillable = [
        'work_day_id',
        'start_time',
        'end_time',
        'status',
    ];

    public function workDay(): BelongsTo
    {
        return $this->belongsTo(WorkDay::class);
    }
}
