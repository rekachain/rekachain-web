<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function work_day(): BelongsTo
    {
        return $this->belongsTo(WorkDay::class);
    }
}
