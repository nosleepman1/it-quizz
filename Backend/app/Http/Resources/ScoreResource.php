<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScoreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quiz_id' => $this->quiz_id,
            'user_id' => $this->user_id,
            'topic_id' => $this->topic_id,
            'points_earned' => $this->points_earned,
            'total_questions' => $this->total_questions,
            'total_correct_answers' => $this->total_correct_answers,
            'accuracy' => (float) $this->accuracy,
            'time_taken' => $this->time_taken,
            'difficulty' => $this->difficulty,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'quiz' => new QuizResource($this->whenLoaded('quiz')),
            'user' => new UserResource($this->whenLoaded('user')),
            'topic' => new TopicResource($this->whenLoaded('topic')),
        ];
    }
}
