<?php

namespace App\Models;

use App\Support\Enums\SerialPanelManufactureStatusEnum;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SerialPanel extends Model {
    use HasFactory, HasFilterable;

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
    protected $filterable = [
        'searchs' => ['product_no', 'notes', 'manufacture_status'],
        'columns' => ['panel_attachment_id', 'manufacture_status'],
    ];

    public function panel_attachment(): BelongsTo {
        return $this->belongsTo(PanelAttachment::class);
    }

    public function detail_worker_panels(): HasMany {
        return $this->hasMany(DetailWorkerPanel::class);
    }
}
