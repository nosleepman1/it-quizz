<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateChoiceRequest extends FormRequest
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
                'question_id' => ['required', 'exists:questions,id'],
                'choice' => ['required', 'string', 'max:255'],
                'is_correct' => ['required', 'boolean'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'question_id.required' => 'La question est requise.',
            'question_id.exists' => 'La question sélectionnée n\'existe pas.',
            'choice.required' => 'Le choix est requis.',
            'is_correct.required' => 'Le statut du choix est requis.',
            'is_correct.boolean' => 'Le statut doit être vrai ou faux.',   
        ];
    }
}
