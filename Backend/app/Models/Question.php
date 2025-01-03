<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    protected $fillable = [
        'topic_id',
        'question',
        'answer',
        'difficulty',
        'type',
        'score',
        'is_active',
    ];

    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }

    public function choices(): HasMany
    {
        return $this->hasMany(Choice::class);
    }

    public function quiz()
    {
        return $this->belongsToMany(Quiz::class, 'quiz_questions')
                    ->withTimestamps();
    }
}
