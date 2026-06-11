<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        $userId = $this->route('user')?->id;

        return [
            'username' => ['sometimes', 'required', 'string', 'max:255', 'unique:users,username,' . $userId],
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', 'unique:users,email,' . $userId],
            'password' => ['nullable', 'string', 'min:8'],
            'role' => ['nullable', 'string', 'max:50'],
            'is_active' => ['nullable', 'boolean'],
            'avatar' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'username.required' => 'Le nom d\'utilisateur est requis.',
            'username.unique' => 'Ce nom d\'utilisateur est déjà pris.',
            'email.required' => 'L\'adresse email est requise.',
            'email.email' => 'L\'adresse email doit être valide.',
            'email.unique' => 'Cette adresse email est déjà enregistrée.',
            'password.min' => 'Le mot de passe doit faire au moins 8 caractères.',
        ];
    }
}
