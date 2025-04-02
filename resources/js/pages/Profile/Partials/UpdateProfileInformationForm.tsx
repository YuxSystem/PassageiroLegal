import React, { FormEventHandler } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
export default function UpdateProfileInformationForm() {
  const { user } = usePage().props.auth
  const { data, setData, put, errors, processing } = useForm({
    name: user?.name || "",
    email: user?.email || "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put('/perfil', {
      onSuccess: () => {
        router.reload();
      }
    });
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Informações do Perfil</h2>
        <p className="mt-1 text-sm text-gray-600">
          Atualize as informações do seu perfil e endereço de email.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
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
