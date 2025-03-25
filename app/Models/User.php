<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\Models\HasFilterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="User",
 *     description="User details",
 *
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="nip",
 *         type="string",
 *         example="123456"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         example="okokok@example.com"
 *     ),
 *     @OA\Property(
 *         property="phone_number",
 *         type="string",
 *         example="081234567890"
 *     )
 * )
 */
class User extends Authenticatable {
    use HasApiTokens, HasFactory, HasFilterable, HasRoles, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'image_path',
        'name',
        'nip',
        'email',
        'phone_number',
        'password',
        'workstation_id',
        'step_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'deleted_at' => 'datetime',
    ];

    protected $filterable = [
        'searchs' => [
            'name', 'nip', 'email', 'phone_number',
        ],
        'columns' => [
            'step_id', 'workstation_id',
        ],
        'relations' => [
            'step', 'workstation',
        ],
    ];

    public function workstation(): HasOne {
        return $this->hasOne(Workstation::class, 'id', 'workstation_id');
    }

    public function step(): HasOne {
        return $this->hasOne(Step::class, 'id', 'step_id');
    }

    public function feedbacks(): HasMany {
        return $this->hasMany(Feedback::class);
    }

    public function panel_attachment_handlers(): HasMany {
        return $this->hasMany(PanelAttachmentHandler::class);
    }

    public function trainset_attachment_handlers(): HasMany {
        return $this->hasMany(TrainsetAttachmentHandler::class);
    }

    public function detail_worker_panels(): HasMany {
        return $this->hasMany(DetailWorkerPanel::class, 'worker_id');
    }

    public function detail_worker_trainsets(): HasMany {
        return $this->hasMany(DetailWorkerTrainset::class, 'worker_id');
    }

    public function panel_attachment_supervisors(): HasMany {
        return $this->hasMany(PanelAttachment::class, 'supervisor_id');
    }

    public function trainset_attachment_supervisors(): HasMany {
        return $this->hasMany(TrainsetAttachment::class, 'supervisor_id');
    }

    public function getImageAttribute() {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    public function canBeDeleted(): bool {
        return $this->feedbacks->isEmpty() &&
            $this->panel_attachment_handlers->isEmpty() &&
            $this->trainset_attachment_handlers->isEmpty() &&
            $this->detail_worker_panels->isEmpty() &&
            $this->detail_worker_trainsets->isEmpty() &&
            $this->panel_attachment_supervisors->isEmpty() &&
            $this->trainset_attachment_supervisors->isEmpty() &&
            $this->projects->isEmpty();
    }

    public function projects(): HasMany {
        return $this->hasMany(Project::class, 'buyer_id');
    }
    
    public function hasProject(): bool {
        return $this->projects()->exists();
    }
}
