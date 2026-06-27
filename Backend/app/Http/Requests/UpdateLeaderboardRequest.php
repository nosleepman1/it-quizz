<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeaderboardRequest extends FormRequest
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
            'total_points' => ['sometimes', 'required', 'integer', 'min:0'],
            'rank' => ['sometimes', 'required', 'integer', 'min:1'],
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'total_points.required' => 'Le total des points est requis.',
            'total_points.integer' => 'Le total des points doit être un nombre entier.',
            'total_points.min' => 'Le total des points doit être d\'au moins 0.',
            'rank.required' => 'Le rang est requis.',
            'rank.integer' => 'Le rang doit être un nombre entier.',
            'rank.min' => 'Le rang doit être d\'au moins 1.',
        ];
    }
}
