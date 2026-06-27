<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
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
            'topic_id' => $this->topic_id,
            'question' => $this->question,
            'answer' => $this->answer,
            'difficulty' => $this->difficulty,
            'type' => $this->type,
            'score' => $this->score,
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'topic' => new TopicResource($this->whenLoaded('topic')),
            'choices' => ChoiceResource::collection($this->whenLoaded('choices')),
        ];
    }
}
