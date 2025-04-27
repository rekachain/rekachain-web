<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScanFace extends Model
{

    protected $guarded = ['id'];

    use HasFactory;

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id');
    }

    protected $casts = [
        'created_at' => 'datetime:d/m/Y H:i:s',
        'updated_at' => 'datetime:d/m/Y H:i:s',
    ];
}
