import React, { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function UpdatePasswordForm() {
  const { data, setData, errors, put, reset, processing } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put('/perfil/senha', {
      onSuccess: () => reset('password', 'password_confirmation'),
    })
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Atualizar Senha</h2>
        <p className="mt-1 text-sm text-gray-600">
          Certifique-se de que sua conta está usando uma senha longa e aleatória para manter a segurança.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
            Senha Atual
          </label>
          <input
            id="current_password"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={data.current_password}
            onChange={(e) => setData('current_password', e.target.value)}
            autoComplete="current-password"
          />
          {errors.current_password && (
            <p className="mt-2 text-sm text-red-600">{errors.current_password}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Nova Senha
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
            Confirmar Senha
          </label>
          <input
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            autoComplete="new-password"
          />
          {errors.password_confirmation && (
            <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={processing}
          >
            Salvar
          </Button>
        </div>
      </form>
    </section>
  );
}
