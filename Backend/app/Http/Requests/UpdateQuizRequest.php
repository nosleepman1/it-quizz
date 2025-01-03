<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateQuizRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'topic_id' => ['required', 'exists:topics,id'],
            'difficulty' => ['required', 'in:facile,moyen,difficile'],
            'status' => ['required', 'in:complété,inachevé'],
            'total_questions' => ['required', 'integer'],
            'total_correct_answers' => ['required', 'integer'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'topic_id.required' => 'Le sujet est requis.',
            'topic_id.exists' => 'Le sujet sélectionné n\'existe pas.',
            'difficulty.required' => 'La difficulté est requise.',
            'difficulty.in' => 'La difficulté doit être facile, moyenne ou difficile.',
            'status.required' => 'Le statut est requis.',
            'status.in' => 'Le statut doit être complété ou inachevé.',
            'total_questions.required' => 'Le nombre total de questions est requis.',
            'total_questions.integer' => 'Le nombre total de questions doit être un entier.',
            'total_correct_answers.required' => 'Le nombre total de réponses correctes est requis.',
            'total_correct_answers.integer' => 'Le nombre total de réponses correctes doit être un entier.',   
        ];
    }
}
