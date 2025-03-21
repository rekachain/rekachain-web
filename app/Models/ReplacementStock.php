<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReplacementStock extends Model
{
    use HasFactory;

    protected $fillable = [
        'component_id',
        'threshold',
        'qty',
    ];

    public function component(): BelongsTo
    {
        return $this->belongsTo(Component::class);
    }
}
