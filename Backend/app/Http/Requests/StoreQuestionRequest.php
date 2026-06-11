<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionRequest extends FormRequest
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
            'text' => ['required', 'string'],
            'topic_id' => ['required', 'exists:topics,id'],
            'question_type' => ['required', 'string', 'max:100'],
            'difficulty' => ['required', 'string', 'max:50'],
            'time_limit' => ['nullable', 'integer', 'min:10', 'max:300'],
            'points' => ['required', 'integer', 'min:1'],
            'is_active' => ['required', 'boolean'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'text.required' => 'Le texte de la question est requis.',
            'topic_id.required' => 'Le sujet de la question est requis.',
            'topic_id.exists' => 'Le sujet sélectionné n\'existe pas.',
            'question_type.required' => 'Le type de question est requis.',
            'difficulty.required' => 'La difficulté de la question est requise.',
            'time_limit.required' => 'Le délai de la question est requis.',
            'time_limit.integer' => 'Le délai doit être un nombre entier.',
            'time_limit.min' => 'Le délai doit être d\'au moins 10 secondes.',
            'time_limit.max' => 'Le délai ne doit pas dépasser 300 secondes.',
            'points.required' => 'Les points de la question sont requis.',
            'points.integer' => 'Les points doivent être un nombre entier.',
            'points.min' => 'Les points doivent être d\'au moins 1.',
            'is_active.required' => 'Le statut de la question est requis.',
            'is_active.boolean' => 'Le statut doit être vrai ou faux.',
        ];
    }
}
