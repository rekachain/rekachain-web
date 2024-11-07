<?php

namespace App\Models;

use App\Support\Enums\SerialPanelManufactureStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SerialPanel extends Model {
    use HasFactory;

    protected $fillable = [
        'product_no',
        'panel_attachment_id',
        'qr_code',
        'qr_path',
        'manufacture_status',
        'notes',
    ];
    protected $casts = [
        'manufacture_status' => SerialPanelManufactureStatusEnum::class,
    ];

    public function panel_attachment(): BelongsTo {
        return $this->belongsTo(PanelAttachment::class);
    }

    public function detail_worker_panels(): HasMany {
        return $this->hasMany(DetailWorkerPanel::class);
    }
}
