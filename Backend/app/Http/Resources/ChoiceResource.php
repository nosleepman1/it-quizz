<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChoiceResource extends JsonResource
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
            'question_id' => $this->question_id,
            'choice' => $this->choice,
            'is_correct' => (bool) $this->is_correct,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'question' => new QuestionResource($this->whenLoaded('question')),
        ];
    }
}
