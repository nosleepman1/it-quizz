<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserProgressRequest extends FormRequest
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
            'user_id' => ['required', 'exists:users,id'],
            'topic_id' => ['required', 'exists:topics,id'],
            'total_questions' => ['nullable', 'integer', 'min:0'],
            'total_correct_answers' => ['nullable', 'integer', 'min:0'],
            'mastery_level' => ['nullable', 'integer', 'min:0', 'max:100'],
            'last_practice_at' => ['nullable', 'date'],
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
        ];
    }
}
