<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WorkAspect extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'division_id',
    ];

    public function progresses(): HasMany
    {
        return $this->hasMany(Progress::class);
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }
}
