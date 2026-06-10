<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreThemeRequest extends FormRequest
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
            'slug' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
            'category_id' => ['required', 'exists:categories,id'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Le nom du thème est requis.',
            'slug.required' => 'Le slug du thème est requis.',
            'is_active.required' => 'Le statut du thème est requis.',
            'is_active.boolean' => 'Le statut doit être vrai ou faux.',
            'category_id.required' => 'La catégorie est requise.',
            'category_id.exists' => 'La catégorie sélectionnée n\'existe pas.',
        ];
    }
}
