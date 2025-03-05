<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SolicitationUpdateStatus extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => 'required|string|in:Em aberto,Pendente,Finalizado',
        ];
    }

    /**
     * Customiza mensagens de erro para regras de validação.
     */
    public function messages()
    {
        return [
            'status.in' => 'Valor para status inválido.',
        ];
    }
}
