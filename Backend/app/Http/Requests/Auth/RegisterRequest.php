<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'username'=>['required','string'],
            'email'=>['required','email','unique:users,email'],
            'password'=>['required','string','min:7'],
            'role'=>['required','in:user,admin'],
            'avatar'=>['nullable','string'],
        ];
    }
    public function messages(): array{
        return[
            'username.required'=>'Votre Nom est Requis',
            'email.required'=>'votre Email est requis',
            'email.email'=>'votre email est invalide',
            'email.unique'=>'votre email existe deja',
            'password.required'=>'votre Mot de Passe est requis',
            'password.min'=>'votre Mot de Passe doit contenir au moins 7 caracteres',
            'role.required'=>'votre Role est requis',
            'role.in'=>'votre Role doit etre user ou admin',
            'avatar.string'=>'votre avatar doit etre une chaine de caracteres',
        ];
    }
}
