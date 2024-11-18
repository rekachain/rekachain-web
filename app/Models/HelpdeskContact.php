<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HelpdeskContact extends Model {
    use HasFactory;

    protected $table = 'helpdesk_contact';
    protected $fillable = [
        'email',
        'phone_number',
        'notice',
    ];
}
