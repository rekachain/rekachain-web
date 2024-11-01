<?php

namespace App\Models;

use App\Support\Enums\PanelAttachmentStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class PanelAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'carriage_panel_id',
        'source_workstation_id',
        'destination_workstation_id',
        'attachment_number',
        'qr_code',
        'qr_path',
        'current_step',
        'elapsed_time',
        'status',
        'panel_attachment_id',
        'supervisor_id',
    ];
    protected $casts = [
        'status' => PanelAttachmentStatusEnum::class,
    ];

    public function trainset(): HasOneThrough
    {
        return $this->hasOneThrough(Trainset::class, CarriageTrainset::class, 'id', 'id', 'carriage_trainset_id', 'trainset_id');
    }

    //    public function project(): HasOneThrough {
    //        return $this->hasOneThrough(
    //            Project::class,        // The final model we want to access
    //            Trainset::class,       // The intermediate model
    //            'id',                  // Foreign key on the intermediate model (Trainset)
    //            'id',                  // Foreign key on the final model (Project)
    //            'carriage_panel_id',// Local key on the current model (PanelAttachment)
    //            'project_id'           // Local key on the intermediate model (Trainset)
    //        )
    //            ->join('carriage_trainset', 'trainsets.id', '=', 'carriage_trainset.trainset_id')
    //            ->join('carriage_panels', 'carriage_trainset.id', '=', 'carriage_panels.carriage_trainset_id')
    //            ->join('panel_attachments', 'carriage_panels.id', '=', 'panel_attachments.carriage_panel_id');
    //    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(PanelAttachment::class, 'panel_attachment_id', 'id');
    }

    public function childs(): HasMany
    {
        return $this->hasMany(PanelAttachment::class, 'panel_attachment_id', 'id');
    }

    public function source_workstation(): BelongsTo
    {
        return $this->belongsTo(Workstation::class, 'source_workstation_id');
    }

    public function destination_workstation(): BelongsTo
    {
        return $this->belongsTo(Workstation::class, 'destination_workstation_id');
    }

    public function carriage_panel(): BelongsTo
    {
        return $this->belongsTo(CarriagePanel::class);
    }

    public function serial_panels(): HasMany
    {
        return $this->hasMany(SerialPanel::class);
    }

    public function detail_worker_panels(): HasManyThrough
    {
        return $this->hasManyThrough(DetailWorkerPanel::class, SerialPanel::class, 'panel_attachment_id', 'serial_panel_id', 'id', 'id');
    }

    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function panel_attachment_handlers(): HasMany
    {
        return $this->hasMany(PanelAttachmentHandler::class);
    }

    public function attachment_notes(): MorphMany
    {
        return $this->morphMany(AttachmentNote::class, 'attachment_noteable');
    }

    public function custom_attachment_materials(): MorphMany
    {
        return $this->morphMany(CustomAttachmentMaterial::class, 'custom_attachment_materialable');
    }
}
