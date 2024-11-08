<?php

namespace App\Models;

use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class DetailWorkerPanel extends Model {
    use HasFactory;

    protected $fillable = [
        'serial_panel_id',
        'worker_id',
        'progress_step_id',
        'estimated_time',
        'work_status',
        'image_path',
        'acceptance_status',
    ];
    protected $casts = [
        'work_status' => DetailWorkerPanelWorkStatusEnum::class,
        'acceptance_status' => DetailWorkerPanelAcceptanceStatusEnum::class,
    ];

    public function serial_panel() {
        return $this->belongsTo(SerialPanel::class);
    }

    public function panel_attachment(): HasOneThrough {
        return $this->hasOneThrough(PanelAttachment::class, SerialPanel::class, 'id', 'id', 'serial_panel_id', 'panel_attachment_id');
    }

    public function worker() {
        return $this->belongsTo(User::class, 'worker_id');
    }

    public function progress_step() {
        return $this->belongsTo(ProgressStep::class);
    }

    public function getImageAttribute() {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }
}