import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface FlightInfoStepProps {
  numeroVoo: string;
  dataVoo: Date | undefined;
  detalhesOcorrido: string;
  onNumeroVooChange: (value: string) => void;
  onDataVooChange: (value: Date | undefined) => void;
  onDetalhesOcorridoChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  errors?: {
    numeroVoo?: string;
    dataVoo?: string;
    detalhesOcorrido?: string;
  };
}

export function FlightInfoStep({
  numeroVoo,
  dataVoo,
  detalhesOcorrido,
  onNumeroVooChange,
  onDataVooChange,
  onDetalhesOcorridoChange,
  onBack,
  onNext,
  errors,
}: FlightInfoStepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Informações Adicionais</CardTitle>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">
          Preencha o formulário com número do voo, data do voo e uma breve descrição do ocorrido.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Número do Voo
            </label>
            <Input
              value={numeroVoo}
              onChange={(e) => onNumeroVooChange(e.target.value)}
              placeholder="Digite o número do voo"
              className={cn(errors?.numeroVoo && "border-red-500")}
            />
            {errors?.numeroVoo && (
              <p className="text-sm text-red-500 mt-1">{errors.numeroVoo}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Data do Voo
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataVoo && "text-muted-foreground",
                    errors?.dataVoo && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataVoo ? (
                    format(dataVoo, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataVoo}
                  onSelect={onDataVooChange}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            {errors?.dataVoo && (
              <p className="text-sm text-red-500 mt-1">{errors.dataVoo}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Detalhes do Ocorrido
            </label>
            <Textarea
              value={detalhesOcorrido}
              onChange={(e) => onDetalhesOcorridoChange(e.target.value)}
              placeholder="Descreva os detalhes do ocorrido"
              className={cn("min-h-[100px]", errors?.detalhesOcorrido && "border-red-500")}
            />
            {errors?.detalhesOcorrido && (
              <p className="text-sm text-red-500 mt-1">{errors.detalhesOcorrido}</p>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={onBack}>
              Voltar
            </Button>
            <Button
              onClick={onNext}
              disabled={!numeroVoo || !dataVoo || !detalhesOcorrido}
            >
              Próximo
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
