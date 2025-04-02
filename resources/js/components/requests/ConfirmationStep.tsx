import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserModel } from "@/models/UserModel";

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

export const ConfirmationStep = ({
  motivo,
  outrosMotivo,
  numeroVoo,
  dataVoo,
  detalhesOcorrido,
  userData,
  onBack,
  onConfirm,
  processing
}: ConfirmationStepProps) => {
  const getFileName = (file: File | null) => {
    return file ? file.name : 'Não selecionado';
  };

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Solicitação</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Motivo</p>
              <p className="mt-1">{motivo}</p>
              {outrosMotivo && (
                <p className="mt-1 text-sm text-gray-600">{outrosMotivo}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Número do Voo</p>
                <p className="mt-1">{numeroVoo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data do Voo</p>
                <p className="mt-1">
                  {dataVoo ? format(dataVoo, "dd/MM/yyyy", { locale: ptBR }) : "Não informado"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Detalhes do Ocorrido</p>
              <p className="mt-1 whitespace-pre-wrap">{detalhesOcorrido}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="mt-1">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Documento</p>
                <p className="mt-1">{userData.legal_document}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Celular</p>
                <p className="mt-1">{userData.cellphone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Endereço</p>
              <p className="mt-1">
                {userData.street}, {userData.city} - {userData.state}
                <br />
                {userData.zipcode}, {userData.country}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onConfirm} disabled={processing}>
          {processing ? "Enviando..." : "Confirmar e Enviar"}
        </Button>
      </div>
    </div>
  );
};
