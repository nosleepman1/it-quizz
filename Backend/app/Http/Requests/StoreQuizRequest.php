<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuizRequest extends FormRequest
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
            'user_id' => ['required', 'exists:users,id'],
            'topic_id' => ['required', 'exists:topics,id'],
            'difficulty' => ['required', 'string', 'max:50'],
            'status' => ['required', 'string', 'max:50'],
            'total_questions' => ['required', 'integer', 'min:1'],
            'total_correct_answers' => ['required', 'integer', 'min:0'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'L\'utilisateur est requis.',
            'user_id.exists' => 'L\'utilisateur sélectionné n\'existe pas.',
            'topic_id.required' => 'Le sujet est requis.',
            'topic_id.exists' => 'Le sujet sélectionné n\'existe pas.',
            'difficulty.required' => 'La difficulté est requise.',
            'status.required' => 'Le statut est requis.',
            'total_questions.required' => 'Le nombre total de questions est requis.',
            'total_questions.integer' => 'Le nombre total de questions doit être un nombre entier.',
            'total_questions.min' => 'Le nombre total de questions doit être d\'au moins 1.',
            'total_correct_answers.required' => 'Le nombre total de réponses correctes est requis.',
            'total_correct_answers.integer' => 'Le nombre total de réponses correctes doit être un nombre entier.',
            'total_correct_answers.min' => 'Le nombre total de réponses correctes doit être d\'au moins 0.',
        ];
    }
}
