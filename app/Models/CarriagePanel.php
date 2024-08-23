<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarriagePanel extends Model
{
    protected $fillable = [
        'progress_id',
        'carriage_id',
        'panel_id',
    ];
}
