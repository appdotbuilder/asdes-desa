<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * App\Models\Report
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $location
 * @property float|null $latitude
 * @property float|null $longitude
 * @property int $category_id
 * @property string $priority
 * @property string $status
 * @property int $user_id
 * @property string $reporter_name
 * @property string $reporter_phone
 * @property string $reporter_email
 * @property array|null $attachments
 * @property string|null $admin_notes
 * @property \Illuminate\Support\Carbon|null $responded_at
 * @property int|null $responded_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\User $user
 * @property-read \App\Models\User|null $respondedBy
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Comment[] $comments
 * @property-read int|null $comments_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Report newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Report newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Report query()
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereAttachments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReporterEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReporterName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReporterPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereRespondedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereRespondedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereUserId($value)
 * @method static \Database\Factories\ReportFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Report extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'location',
        'latitude',
        'longitude',
        'category_id',
        'priority',
        'status',
        'user_id',
        'reporter_name',
        'reporter_phone',
        'reporter_email',
        'attachments',
        'admin_notes',
        'responded_at',
        'responded_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'attachments' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'responded_at' => 'datetime',
    ];

    /**
     * Get the category that owns the report.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the user that owns the report.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the admin who responded to the report.
     */
    public function respondedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responded_by');
    }

    /**
     * Get all of the report's comments.
     */
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}