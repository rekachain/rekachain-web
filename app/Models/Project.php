<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'project';

    protected $fillable = [
        'name',
        'initial_date'
    ];

    public function trainsets(): HasMany
    {
        return $this->hasMany(Trainset::class);
    }

    // public function projectAttachments(): HasMany
    // {
    //     return $this->hasMany(ProjectAttachment::class, 'id_project', 'id');
    // }
}
