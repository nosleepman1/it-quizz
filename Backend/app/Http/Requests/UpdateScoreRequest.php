<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateScoreRequest extends FormRequest
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
            'quiz_id' => ['required', 'exists:quizzes,id'],
            'points_earned' => ['required', 'integer'],
            'total_questions' => ['required', 'integer'],
            'total_correct_answers' => ['required', 'integer'],
            'accuracy' => ['required', 'numeric', 'min:0', 'max:100'],
            'time_taken' => ['required', 'integer'],
            'difficulty' => ['required', 'in:facile,moyen,difficile'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'quiz_id.required' => 'Le quiz est requis.',
            'quiz_id.exists' => 'Le quiz sélectionné n\'existe pas.',
            'points_earned.required' => 'Les points gagnés sont requis.',
            'points_earned.integer' => 'Les points gagnés doivent être un entier.',
            'total_questions.required' => 'Le nombre total de questions est requis.',
            'total_questions.integer' => 'Le nombre total de questions doit être un entier.',
            'total_correct_answers.required' => 'Le nombre total de réponses correctes est requis.',
            'total_correct_answers.integer' => 'Le nombre total de réponses correctes doit être un entier.',
            'accuracy.required' => 'La précision est requise.',
            'accuracy.numeric' => 'La précision doit être un nombre.',
            'accuracy.min' => 'La précision doit être au moins 0.',
            'accuracy.max' => 'La précision ne doit pas dépasser 100.',
            'time_taken.required' => 'Le temps pris est requis.',
            'time_taken.integer' => 'Le temps pris doit être un entier.',
            'difficulty.required' => 'La difficulté est requise.',
            'difficulty.in' => 'La difficulté doit être facile, moyenne ou difficile.',   
        ];
    }
}
