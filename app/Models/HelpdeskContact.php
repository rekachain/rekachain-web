<?php

namespace App\Models;

use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HelpdeskContact extends Model {
    use HasFactory, HasFilterable;

    protected $table = 'helpdesk_contact';
    protected $fillable = [
        'email',
        'phone_number',
        'notice',
    ];
    protected $filterable = [
        'searchs' => [
            'email',
            'phone_number',
            'notice',
        ],
    ];
}
