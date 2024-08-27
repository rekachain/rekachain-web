<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WorkDay extends Model
{
    use HasFactory;

    protected $fillable = [
        'day'
    ];

    public function times(): HasMany
    {
        return $this->hasMany(WorkDayTime::class);
    }
}
