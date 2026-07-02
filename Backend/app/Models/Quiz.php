<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Quiz extends Model
{
    protected $table = 'quizzes';

    protected $fillable = [
        'user_id',
        'topic_id',
        'difficulty',
        'status',
        'total_questions',
        'total_correct_answers',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }

    public function score(): HasOne
    {
        return $this->hasOne(Score::class);
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'quiz_questions')
            ->withTimestamps();
    }   
}
