<?php

namespace App\Models;

use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
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
        'acceptance_status'
    ];

    protected $casts = [
        'work_status' => DetailWorkerPanelWorkStatusEnum::class,
        'acceptance_status' => DetailWorkerPanelAcceptanceStatusEnum::class
    ];

    public function serial_panel()
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
