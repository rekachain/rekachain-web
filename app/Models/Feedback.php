<?php

namespace App\Models;

use App\Support\Enums\FeedbackStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'message',
        'rating',
        'status',
    ];
    protected $casts = [
        'rating' => 'integer',
        'status' => FeedbackStatusEnum::class,
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function canBeDeleted(): bool {
        return $this->status === FeedbackStatusEnum::PENDING;
    }
}
