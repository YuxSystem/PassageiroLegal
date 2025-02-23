<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'cpf' => 'required|unique:users',
            'password' => 'required|min:6',
            'telefone' => 'nullable',
            'celular' => 'nullable',
            'cidade' => 'nullable',
            'estado' => 'nullable',
            'pais' => 'nullable',
        ];
    }
}
