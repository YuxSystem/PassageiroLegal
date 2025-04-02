import React, { useState, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';

export default function DeleteAccountForm() {
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);
  const { data, setData, delete: destroy, processing, reset, errors } = useForm({
    password: '',
  });

  const confirmDeletion = () => {
    setConfirmingDeletion(true);
  };

  const closeModal = () => {
    setConfirmingDeletion(false);
    reset();
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    destroy('/perfil', {
      onSuccess: () => closeModal(),
    });
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Excluir Conta</h2>
        <p className="mt-1 text-sm text-gray-600">
          Uma vez que sua conta é excluída, todos os seus recursos e dados serão permanentemente apagados.
        </p>
      </header>

      <div className="mt-5">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
          onClick={confirmDeletion}
        >
          Excluir Conta
        </button>
      </div>

      {confirmingDeletion && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Tem certeza que deseja excluir sua conta?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Uma vez que sua conta é excluída, todos os seus recursos e dados serão permanentemente apagados. Por favor, digite sua senha para confirmar que você deseja excluir permanentemente sua conta.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={submit} className="mt-5">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Senha
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Senha"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                      disabled={processing}
                    >
                      Excluir Conta
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
