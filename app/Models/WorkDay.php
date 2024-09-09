<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WorkDay extends Model {
    use HasFactory;

    protected $fillable = [
        'day',
    ];

    public function work_day_times(): HasMany {
        return $this->hasMany(WorkDayTime::class);
    }

    public function canBeDeleted() {
        return $this->work_day_times->isEmpty();
    }
}
