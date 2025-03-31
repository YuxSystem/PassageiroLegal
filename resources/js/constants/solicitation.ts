import { Step } from '@/components/Stepper';

export const STEPS: Step[] = [
  { id: 1, title: 'Elegibilidade', description: 'Verificação de Elegibilidade' },
  { id: 2, title: 'Voo', description: 'Informações do Voo' },
  { id: 3, title: 'Documentos', description: 'Envio de Documentos' },
  { id: 4, title: 'Dados', description: 'Dados Pessoais' },
];

export const REQUIRED_USER_FIELDS = [
  'name',
  'email',
  'legal_document',
  'cellphone',
  'street',
  'city',
  'state',
  'zipcode',
  'country',
] as const;
