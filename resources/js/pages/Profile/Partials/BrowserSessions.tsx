import React, { useState, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';

interface Session {
  agent: string;
  ip: string;
  is_current: boolean;
  last_active: string;
}

interface Props {
  sessions: Session[];
}

export default function BrowserSessions({ sessions }: Props) {
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const { data, setData, post, processing, reset, errors } = useForm({
    password: '',
  });

  const confirmLogout = () => {
    setConfirmingLogout(true);
  };

  const closeModal = () => {
    setConfirmingLogout(false);
    reset();
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/profile/browser-sessions', {
      onSuccess: () => closeModal(),
    });
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Sessões do Navegador</h2>
        <p className="mt-1 text-sm text-gray-600">
          Gerencie e desconecte suas sessões ativas em outros navegadores e dispositivos.
        </p>
      </header>

      <div className="mt-5 space-y-6">
        {sessions.length > 0 ? (
          <div className="space-y-6">
            {sessions.map((session, i) => (
              <div key={i} className="flex items-center">
                <div>
                  <svg
                    className="w-8 h-8 text-gray-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="ml-3">
                  <div className="text-sm text-gray-600">
                    {session.agent}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">
                      {session.ip},{' '}
                      {session.is_current ? (
                        <span className="text-green-500 font-semibold">Este dispositivo</span>
                      ) : (
                        <span>Última atividade {session.last_active}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            Nenhuma sessão ativa encontrada em outros navegadores.
          </div>
        )}

        <div className="flex items-center mt-5">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            onClick={confirmLogout}
          >
            Desconectar Outras Sessões
          </button>
        </div>
      </div>

      {confirmingLogout && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Desconectar Outras Sessões do Navegador
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Por favor, digite sua senha para confirmar que você deseja desconectar suas outras sessões do navegador em todos os seus dispositivos.
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
                      Desconectar Outras Sessões
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
