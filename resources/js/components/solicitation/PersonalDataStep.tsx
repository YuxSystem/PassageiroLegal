import React from 'react';
import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserModel } from '@/models/UserModel';
import { cn } from '@/lib/utils';

interface PersonalDataStepProps {
  userData: Partial<UserModel>;
  onUserDataChange: (field: keyof UserModel) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUserDataValid: () => boolean;
  onBack: () => void;
  onNext: () => void;
  errors?: {
    [K in keyof UserModel]?: string;
  };
  processing: boolean;
}

export function PersonalDataStep({
  userData,
  onUserDataChange,
  isUserDataValid,
  onBack,
  onNext,
  errors,
  processing,
}: PersonalDataStepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Dados Pessoais</CardTitle>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">
          Preencha seus dados pessoais para finalizar a solicitação.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-6">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nome Completo
                </label>
                <Input
                  value={userData.name}
                  onChange={onUserDataChange('name')}
                  placeholder="Digite seu nome completo"
                  className={cn(errors?.name && "border-red-500")}
                />
                {errors?.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  CPF
                </label>
                <Input
                  value={userData.legal_document}
                  onChange={onUserDataChange('legal_document')}
                  placeholder="Digite seu CPF"
                  className={cn(errors?.legal_document && "border-red-500")}
                />
                {errors?.legal_document && (
                  <p className="text-sm text-red-500 mt-1">{errors.legal_document}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  E-mail
                </label>
                <Input
                  type="email"
                  value={userData.email}
                  onChange={onUserDataChange('email')}
                  placeholder="Digite seu e-mail"
                  className={cn(errors?.email && "border-red-500")}
                />
                {errors?.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Celular
                </label>
                <Input
                  value={userData.cellphone}
                  onChange={onUserDataChange('cellphone')}
                  placeholder="Digite seu celular"
                  className={cn(errors?.cellphone && "border-red-500")}
                />
                {errors?.cellphone && (
                  <p className="text-sm text-red-500 mt-1">{errors.cellphone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Rua/Avenida
                </label>
                <Input
                  value={userData.street}
                  onChange={onUserDataChange('street')}
                  placeholder="Digite seu endereço"
                  className={cn(errors?.street && "border-red-500")}
                />
                {errors?.street && (
                  <p className="text-sm text-red-500 mt-1">{errors.street}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Cidade
                </label>
                <Input
                  value={userData.city}
                  onChange={onUserDataChange('city')}
                  placeholder="Digite sua cidade"
                  className={cn(errors?.city && "border-red-500")}
                />
                {errors?.city && (
                  <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Estado
                </label>
                <Input
                  value={userData.state}
                  onChange={onUserDataChange('state')}
                  placeholder="Digite seu estado"
                  className={cn(errors?.state && "border-red-500")}
                />
                {errors?.state && (
                  <p className="text-sm text-red-500 mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  CEP
                </label>
                <Input
                  value={userData.zipcode}
                  onChange={onUserDataChange('zipcode')}
                  placeholder="Digite seu CEP"
                  className={cn(errors?.zipcode && "border-red-500")}
                />
                {errors?.zipcode && (
                  <p className="text-sm text-red-500 mt-1">{errors.zipcode}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  País
                </label>
                <Input
                  value={userData.country}
                  onChange={onUserDataChange('country')}
                  placeholder="Digite seu país"
                  className={cn(errors?.country && "border-red-500")}
                />
                {errors?.country && (
                  <p className="text-sm text-red-500 mt-1">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={onBack} disabled={processing}>
              Voltar
            </Button>
            <Button onClick={onNext} disabled={!isUserDataValid() || processing}>
              {processing ? "Enviando..." : "Finalizar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
