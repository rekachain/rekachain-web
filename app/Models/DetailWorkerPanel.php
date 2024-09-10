<?php

namespace App\Models;

use App\Support\Enums\DetailWorkerPanelStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailWorkerPanel extends Model
{
    use HasFactory;

    protected $fillable = [
        'serial_panel_id', 
        'worker_id', 
        'step_id', 
        'estimated_time', 
        'work_status', 
        'status'
    ];

    protected $casts = [
        'status' => DetailWorkerPanelStatusEnum::class
    ];

    public function serialPanel()
    {
        return $this->belongsTo(SerialPanel::class);
    }

    public function worker()
    {
        return $this->belongsTo(User::class, 'worker_id');
    }

    public function step()
    {
        return $this->belongsTo(Step::class);
    }
}
