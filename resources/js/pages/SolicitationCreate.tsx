import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Stepper } from '@/components/ui/Stepper';
import { EligibilityStep } from '@/components/requests/EligibilityStep';
import { FlightInfoStep } from '@/components/requests/FlightInfoStep';
import { DocumentsStep } from '@/components/requests/DocumentsStep';
import { PersonalDataStep } from '@/components/requests/PersonalDataStep';
import { ConfirmationStep } from '@/components/requests/ConfirmationStep';
import { UserModel } from '@/models/UserModel';
import { STEPS, REQUIRED_USER_FIELDS } from '@/constants/solicitation';
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function SolicitationCreate() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [stepErrors, setStepErrors] = React.useState<Record<number, boolean>>({});
  const { user } = usePage().props.auth

  const { data, setData, processing, errors, clearErrors } = useForm({
    motivo: '',
    outrosMotivo: '',
    num_voo: '',
    dta_voo: undefined as Date | undefined,
    detalhe: '',
    registro_nasc: null as File | null,
    comprovante_res: null as File | null,
    comprovante_voo: null as File | null,
    userData: {
      name: user?.name || "",
      email: user?.email || "",
      legal_document: user?.legal_document || "",
      phone: user?.phone || "",
      cellphone: user?.cellphone || "",
      street: user?.street || "",
      city: user?.city || "",
      state: user?.state || "",
      zipcode: user?.zipcode || "",
      country: user?.country || "",
    } as Partial<UserModel>,
  });

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !errors.motivo && !errors.outrosMotivo;
      case 2:
        return !errors.num_voo && !errors.dta_voo && !errors.detalhe;
      case 3:
        return !errors.registro_nasc && !errors.comprovante_res && !errors.comprovante_voo;
      case 4:
        return !Object.keys(errors.userData || {}).length;
      case 5:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
        clearErrors();
      } else {
        setStepErrors(prev => ({ ...prev, [currentStep]: true }));
      }
    } else if (currentStep === STEPS.length) {
      if (validateStep(currentStep)) {
        const formattedData = {
          ...data,
          dta_voo: data.dta_voo ? new Date(data.dta_voo).toISOString().split('T')[0] : undefined,
        };

        router.post('/solicitacao', formattedData as any);
      } else {
        setStepErrors(prev => ({ ...prev, [currentStep]: true }));
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      clearErrors();
      setStepErrors(prev => ({ ...prev, [currentStep]: false }));
    }
  };

  const handleUserDataChange = (field: keyof UserModel) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData('userData', {
      ...data.userData,
      [field]: e.target.value,
    });
  };

  const isUserDataValid = () => {
    return REQUIRED_USER_FIELDS.every(
      (field) => data.userData[field] && data.userData[field].toString().trim() !== ''
    );
  };

  const handleSubmit = () => {
    const formattedData = {
      ...data,
      dta_voo: data.dta_voo ? new Date(data.dta_voo).toISOString().split('T')[0] : undefined,
    };

    router.post('/solicitacao', formattedData as any);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EligibilityStep
            motivo={data.motivo}
            outrosMotivo={data.outrosMotivo}
            onMotivoChange={(value) => setData('motivo', value)}
            onOutrosMotivoChange={(value) => setData('outrosMotivo', value)}
            onNext={handleNext}
            error={errors.motivo || errors.outrosMotivo}
          />
        );
      case 2:
        return (
          <FlightInfoStep
            numeroVoo={data.num_voo}
            dataVoo={data.dta_voo}
            detalhesOcorrido={data.detalhe}
            onNumeroVooChange={(value) => setData('num_voo', value)}
            onDataVooChange={(value) => setData('dta_voo', value)}
            onDetalhesOcorridoChange={(value) => setData('detalhe', value)}
            onBack={handleBack}
            onNext={handleNext}
            errors={{
              numeroVoo: errors.num_voo,
              dataVoo: errors.dta_voo,
              detalhesOcorrido: errors.detalhe,
            }}
          />
        );
      case 3:
        return (
          <DocumentsStep
            registroNacional={data.registro_nasc}
            comprovanteResidencia={data.comprovante_res}
            passagemAerea={data.comprovante_voo}
            onRegistroNacionalChange={(file) => setData('registro_nasc', file)}
            onComprovanteResidenciaChange={(file) => setData('comprovante_res', file)}
            onPassagemAereaChange={(file) => setData('comprovante_voo', file)}
            onBack={handleBack}
            onNext={handleNext}
            errors={{
              registroNacional: errors.registro_nasc,
              comprovanteResidencia: errors.comprovante_res,
              passagemAerea: errors.comprovante_voo,
            }}
          />
        );
      case 4:
        return (
          <PersonalDataStep
            userData={data.userData}
            onUserDataChange={handleUserDataChange}
            isUserDataValid={isUserDataValid}
            onBack={handleBack}
            onNext={handleNext}
            errors={errors.userData as unknown as Record<keyof UserModel, string>}
            processing={processing}
          />
        );
      case 5:
        return (
          <ConfirmationStep
            motivo={data.motivo}
            outrosMotivo={data.outrosMotivo}
            numeroVoo={data.num_voo}
            dataVoo={data.dta_voo}
            detalhesOcorrido={data.detalhe}
            userData={data.userData}
            onBack={handleBack}
            onConfirm={handleSubmit}
            processing={processing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head title="Nova Solicitação | Passageiro Legal" />

      <div className="px-2 sm:px-4 md:container mx-auto py-6 md:py-10">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.visit('/solicitacoes')}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold tracking-tight text-[#0284C7]">Nova Solicitação</h1>
            </div>
            <p className="text-sm text-gray-500 ml-11">
              Preencha os dados para solicitar sua indenização
            </p>
          </div>
          <Separator />
        </div>

        <div className="mt-4 md:mt-6">
          <div className="mb-8">
            <Stepper steps={STEPS} currentStep={currentStep} />
          </div>
          <Card>
            {renderStepContent()}
          </Card>
        </div>
      </div>
    </>
  );
}
