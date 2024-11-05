<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomAttachmentMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'raw_material_id',
        'qty'
    ];

    public function custom_attachment_materialable()
    {
        return $this->morphTo();
    }
}
