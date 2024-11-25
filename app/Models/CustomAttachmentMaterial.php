<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomAttachmentMaterial extends Model {
    use HasFactory;

    protected $fillable = [
        'raw_material_id',
        'qty',
    ];

    public function raw_material() {
        return $this->belongsTo(RawMaterial::class);
    }

    public function custom_attachment_materialable() {
        return $this->morphTo();
    }
}
