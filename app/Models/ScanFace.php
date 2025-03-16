<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScanFace extends Model
{
    protected $fillable = [
        'user_id',
        'image_path',
        'status',
        'kpm',
        'panel',
    ];

    use HasFactory;

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id');
    }
}
