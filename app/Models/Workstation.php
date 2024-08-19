<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Workstation extends Model {
    protected $fillable = [
        'workshop_id',
        'division_id',
        'name',
        'location',
    ];

    public function workshop(): BelongsTo {
        return $this->belongsTo(Workshop::class);
    }

    public function division(): BelongsTo {
        return $this->belongsTo(Division::class);
    }
}
