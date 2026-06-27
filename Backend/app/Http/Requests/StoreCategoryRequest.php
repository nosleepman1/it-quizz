<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'theme_id' => ['required', 'exists:themes,id'],
            'slug' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
            'icon' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Le nom de la catégorie est requis.',
            'theme_id.required' => 'Le thème de la catégorie est requis.',
            'theme_id.exists' => 'Le thème sélectionné n\'existe pas.',
            'slug.required' => 'Le slug de la catégorie est requis.',
            'is_active.required' => 'Le statut de la catégorie est requis.',
            'is_active.boolean' => 'Le statut doit être vrai ou faux.',
        ];
    }
}
