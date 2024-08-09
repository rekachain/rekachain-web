<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'date'
    ];

    public function trainsets(): HasMany
    {
        return $this->hasMany(Trainset::class, 'id_project', 'id');
    }

    public function projectAttachments(): HasMany
    {
        return $this->hasMany(ProjectAttachment::class, 'id_project', 'id');
    }
}
