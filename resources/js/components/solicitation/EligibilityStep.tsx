import React from 'react';
import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const motivosReclamacao = [
  { id: 'atraso', label: 'Atraso de Voo' },
  { id: 'cancelamento', label: 'Cancelamento de Voo' },
  { id: 'overbooking', label: 'Overbooking' },
  { id: 'outros', label: 'Outros' },
] as const;

interface EligibilityStepProps {
  motivo: string;
  outrosMotivo: string;
  onMotivoChange: (value: string) => void;
  onOutrosMotivoChange: (value: string) => void;
  onNext: () => void;
  error?: string;
}

export function EligibilityStep({
  motivo,
  outrosMotivo,
  onMotivoChange,
  onOutrosMotivoChange,
  onNext,
  error,
}: EligibilityStepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Verificação de Elegibilidade</CardTitle>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Escolha o motivo de sua solicitação</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Motivo da Reclamação
            </label>
            <Select value={motivo} onValueChange={onMotivoChange}>
              <SelectTrigger className={cn("w-full", error && "border-red-500")}>
                <SelectValue placeholder="Escolha o motivo da sua solicitação" />
              </SelectTrigger>
              <SelectContent>
                {motivosReclamacao.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>

          {motivo === 'outros' && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Descreva o motivo
              </label>
              <Textarea
                value={outrosMotivo}
                onChange={(e) => onOutrosMotivoChange(e.target.value)}
                placeholder="Descreva o motivo da sua solicitação"
                className={cn("min-h-[100px]", error && "border-red-500")}
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={onNext}
              disabled={!motivo || (motivo === 'outros' && !outrosMotivo)}
            >
              Próximo
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
