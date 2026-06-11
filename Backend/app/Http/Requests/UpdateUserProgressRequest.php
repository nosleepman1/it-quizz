<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProgressRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'total_questions' => ['sometimes', 'required', 'integer', 'min:0'],
            'total_correct_answers' => ['sometimes', 'required', 'integer', 'min:0'],
            'mastery_level' => ['sometimes', 'required', 'integer', 'min:0', 'max:100'],
            'last_practice_at' => ['nullable', 'date'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'total_questions.integer' => 'Le nombre total de questions doit être un entier.',
            'total_correct_answers.integer' => 'Le nombre total de réponses correctes doit être un entier.',
            'mastery_level.integer' => 'Le niveau de maîtrise doit être un entier.',
        ];
    }
}
