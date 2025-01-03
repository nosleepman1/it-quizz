<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTopicRequest extends FormRequest
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
            'subcategory_id' => ['required', 'exists:subcategories,id'],
            'theme_id' => ['required', 'exists:themes,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'subcategory_id.required' => 'La sous-catégorie est requise.',
            'subcategory_id.exists' => 'La sous-catégorie sélectionnée n\'existe pas.',
            'theme_id.required' => 'Le thème est requis.',
            'theme_id.exists' => 'Le thème sélectionné n\'existe pas.',
            'name.required' => 'Le nom du sujet est requis.',
            'slug.required' => 'Le slug du sujet est requis.',
            'is_active.required' => 'Le statut du sujet est requis.',
            'is_active.boolean' => 'Le statut doit être vrai ou faux.',
        ];
    }
}
