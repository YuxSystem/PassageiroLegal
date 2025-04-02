import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserModel } from "@/models/UserModel";
import { Separator } from "@/components/ui/separator";

interface ConfirmationStepProps {
  motivo: string;
  outrosMotivo?: string;
  numeroVoo: string;
  dataVoo?: Date;
  detalhesOcorrido: string;
  userData: Partial<UserModel>;
  onBack: () => void;
  onConfirm: () => void;
  processing: boolean;
}

const DataItem = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-sm">{value || '-'}</p>
  </div>
);

export function ConfirmationStep({
  motivo,
  outrosMotivo,
  numeroVoo,
  dataVoo,
  detalhesOcorrido,
  userData,
  onBack,
  onConfirm,
  processing,
}: ConfirmationStepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Revisar Informações</CardTitle>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">
          Revise todas as informações antes de enviar sua solicitação.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Informações da Elegibilidade */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Informações da Elegibilidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <DataItem label="Motivo" value={motivo} />
              {outrosMotivo && <DataItem label="Outros Motivos" value={outrosMotivo} />}
            </div>
          </div>

          {/* Informações do Voo */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Informações do Voo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <DataItem label="Número do Voo" value={numeroVoo} />
              <DataItem
                label="Data do Voo"
                value={dataVoo ? format(dataVoo, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : undefined}
              />
              <div className="md:col-span-2">
                <DataItem label="Detalhes do Ocorrido" value={detalhesOcorrido} />
              </div>
            </div>
          </div>

          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <DataItem label="Nome Completo" value={userData.name} />
              <DataItem label="CPF" value={userData.legal_document} />
              <DataItem label="E-mail" value={userData.email} />
              <DataItem label="Celular" value={userData.cellphone} />
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <DataItem label="CEP" value={userData.zipcode} />
              <DataItem label="Rua/Avenida" value={userData.street} />
              <DataItem label="Cidade" value={userData.city} />
              <DataItem label="Estado" value={userData.state} />
              <DataItem label="País" value={userData.country} />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={onBack} disabled={processing}>
              Voltar
            </Button>
            <Button onClick={onConfirm} disabled={processing}>
              {processing ? "Enviando..." : "Confirmar e Enviar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
