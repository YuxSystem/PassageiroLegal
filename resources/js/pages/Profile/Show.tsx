import React from 'react';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import BrowserSessions from './Partials/BrowserSessions';
import DeleteAccountForm from './Partials/DeleteAccountForm';

interface Props {
  sessions: Array<{
    agent: string;
    ip: string;
    is_current: boolean;
    last_active: string;
  }>;
  twoFactorEnabled: boolean;
}

export default function Show({ sessions, twoFactorEnabled }: Props) {
  return (
    <>
      <Head title="Perfil" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateProfileInformationForm />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdatePasswordForm />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <BrowserSessions sessions={sessions} />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <DeleteAccountForm />
          </div>
        </div>
      </div>
    </>
  );
}
