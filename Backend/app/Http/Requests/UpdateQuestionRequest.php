<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateQuestionRequest extends FormRequest
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
            'question' => ['required', 'string'],
            'answer' => ['required', 'string'],
            'difficulty' => ['required', 'in:facile,moyen,difficile'],
            'type' => ['required', 'in:QCM,bool'],
            'score' => ['required', 'integer'],
            'is_active' => ['required', 'boolean'],
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
            'question.required' => 'La question est requise.',
            'answer.required' => 'La réponse est requise.',
            'difficulty.required' => 'La difficulté est requise.',
            'difficulty.in' => 'La difficulté doit être facile, moyenne ou difficile.',
            'type.required' => 'Le type est requis.',
            'type.in' => 'Le type doit être QCM ou bool.',
            'score.required' => 'Le score est requis.',
            'is_active.required' => 'Le statut de la question est requis.',
            'is_active.boolean' => 'Le statut doit être vrai ou faux.',   
        ];
    }
}
