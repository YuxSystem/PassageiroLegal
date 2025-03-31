<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SolicitationRequest extends FormRequest
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
      'motivo' => 'required|string',
      'num_voo' => 'required|string',
      'dta_voo' => 'required|date',
      'detalhe' => 'required|string',
      'registro_nasc' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
      'comprovante_res' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
      'comprovante_voo' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
    ];
  }
}
