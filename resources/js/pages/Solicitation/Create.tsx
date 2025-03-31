import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import UserLayout from '@/components/UserLayout';
import { Card } from '@/components/ui/card';
import { Stepper } from '@/components/Stepper';
import { EligibilityStep } from '@/components/solicitation/EligibilityStep';
import { FlightInfoStep } from '@/components/solicitation/FlightInfoStep';
import { DocumentsStep } from '@/components/solicitation/DocumentsStep';
import { PersonalDataStep } from '@/components/solicitation/PersonalDataStep';
import { UserModel } from '@/models/UserModel';
import { STEPS, REQUIRED_USER_FIELDS } from '@/constants/solicitation';

export default function Create() {
  const [currentStep, setCurrentStep] = React.useState(1);

  const { data, setData, post, processing, errors } = useForm({
    motivo: '',
    outrosMotivo: '',
    numeroVoo: '',
    dataVoo: undefined as Date | undefined,
    detalhesOcorrido: '',
    registroNacional: null as File | null,
    comprovanteResidencia: null as File | null,
    passagemAerea: null as File | null,
    userData: {
      name: '',
      email: '',
      legal_document: '',
      phone: '',
      cellphone: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    } as Partial<UserModel>,
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === STEPS.length) {
      post('/solicitacao', {
        onSuccess: () => {
          // Redirecionar ou mostrar mensagem de sucesso
        },
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
            error={errors.motivo}
          />
        );
      case 2:
        return (
          <FlightInfoStep
            numeroVoo={data.numeroVoo}
            dataVoo={data.dataVoo}
            detalhesOcorrido={data.detalhesOcorrido}
            onNumeroVooChange={(value) => setData('numeroVoo', value)}
            onDataVooChange={(value) => setData('dataVoo', value)}
            onDetalhesOcorridoChange={(value) => setData('detalhesOcorrido', value)}
            onBack={handleBack}
            onNext={handleNext}
            errors={{
              numeroVoo: errors.numeroVoo,
              dataVoo: errors.dataVoo,
              detalhesOcorrido: errors.detalhesOcorrido,
            }}
          />
        );
      case 3:
        return (
          <DocumentsStep
            registroNacional={data.registroNacional}
            comprovanteResidencia={data.comprovanteResidencia}
            passagemAerea={data.passagemAerea}
            onRegistroNacionalChange={(file) => setData('registroNacional', file)}
            onComprovanteResidenciaChange={(file) => setData('comprovanteResidencia', file)}
            onPassagemAereaChange={(file) => setData('passagemAerea', file)}
            onBack={handleBack}
            onNext={handleNext}
            errors={{
              registroNacional: errors.registroNacional,
              comprovanteResidencia: errors.comprovanteResidencia,
              passagemAerea: errors.passagemAerea,
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
            errors={errors.userData as Record<keyof UserModel, string>}
            processing={processing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <Head title="Nova Solicitação" />

      <div className="container max-w-5xl mx-auto">
        <Stepper steps={STEPS} currentStep={currentStep} />
        <Card>{renderStepContent()}</Card>
      </div>
    </UserLayout>
  );
}
