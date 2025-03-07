<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScanFace extends Model
{
    protected $fillable = [
        'user_id',
        'image_path',
        'status',
    ];

    use HasFactory;
}