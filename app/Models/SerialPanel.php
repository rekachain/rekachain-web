<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SerialPanel extends Model {
    use HasFactory;

    protected $fillable = [
        'panel_attachment_id',
        'qr_code',
        'qr_path',
    ];
}
