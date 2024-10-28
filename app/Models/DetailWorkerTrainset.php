<?php

namespace App\Models;

use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class DetailWorkerTrainset extends Model
{
    use HasFactory;

    protected $fillable = [
        'trainset_attachment_component_id',
        'worker_id',
        'progress_step_id',
        'estimated_time',
        'work_status',
        'acceptance_status',
        'image_path'
    ];

    protected $casts = [
        'acceptance_status' => DetailWorkerTrainsetAcceptanceStatusEnum::class,
        'work_status' => DetailWorkerTrainsetWorkStatusEnum::class,
    ];

    public function trainset_attachment_component(): BelongsTo
    {
        return $this->belongsTo(TrainsetAttachmentComponent::class);
    }

    public function trainset_attachment(): HasOneThrough
    {
        return $this->hasOneThrough(TrainsetAttachment::class, TrainsetAttachmentComponent::class, 'id', 'id', 'trainset_attachment_component_id', 'trainset_attachment_id');
    }

    public function worker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'worker_id');
    }

    public function progress_step(): BelongsTo
    {
        return $this->belongsTo(ProgressStep::class);
    }

    public function getImageAttribute() {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    public function failed_component_manufactures(): HasMany
    {
        return $this->hasMany(FailedComponentManufacture::class);
    }
}