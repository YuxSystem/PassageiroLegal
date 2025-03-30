<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

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
      'password' => [
        'required',
        'string',
        Password::min(8)
          ->letters()
          ->mixedCase()
          ->numbers()
          ->symbols()
          ->uncompromised(),
        'confirmed',
      ],
      'password_confirmation' => 'required',
      'acceptedTerms' => 'required|boolean|accepted',
    ];
  }

  public function messages(): array
  {
    return [
      'name.required' => 'Por favor, informe seu nome completo.',
      'name.max' => 'O nome não pode ter mais que 255 caracteres.',
      'email.required' => 'Por favor, informe seu e-mail.',
      'email.email' => 'O e-mail informado não é válido.',
      'email.unique' => 'Este e-mail já está cadastrado em nossa plataforma.',
      'password.required' => 'Por favor, crie uma senha para sua conta.',
      'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
      'password.letters' => 'A senha deve conter pelo menos uma letra.',
      'password.mixed' => 'A senha deve conter pelo menos uma letra maiúscula e uma minúscula.',
      'password.numbers' => 'A senha deve conter pelo menos um número.',
      'password.symbols' => 'A senha deve conter pelo menos um caractere especial (@$!%*#?&).',
      'password.uncompromised' => 'Por questões de segurança, esta senha não pode ser utilizada. Por favor, escolha outra senha.',
      'password.confirmed' => 'As senhas informadas não correspondem.',
      'password_confirmation.required' => 'Por favor, confirme sua senha.',
      'acceptedTerms.required' => 'Para criar sua conta, você precisa aceitar os termos de uso.',
      'acceptedTerms.accepted' => 'Para criar sua conta, você precisa aceitar os termos de uso e a política de privacidade.',
    ];
  }
}
