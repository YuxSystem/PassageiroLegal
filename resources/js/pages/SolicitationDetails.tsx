import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import AdminLayout from "@/components/AdminLayout";
import { Separator } from "@/components/ui/separator";
import { router } from "@inertiajs/react";
import { ArrowLeft, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Solicitation {
  id: string;
  user_id: string;
  motivo: string;
  num_voo: string;
  dta_voo: string;
  detalhe: string;
  registro_nasc: string;
  comprovante_res: string;
  comprovante_voo: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  solicitation: Solicitation;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "em aberto":
      return "bg-blue-100 text-blue-800";
    case "pendente":
      return "bg-yellow-100 text-yellow-800";
    case "finalizado":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case "em aberto":
      return "Em aberto";
    case "pendente":
      return "Pendente";
    case "finalizado":
      return "Finalizado";
    default:
      return status;
  }
};

const getFileName = (path: string) => {
  const fileName = path.split('/').pop() || '';
  return fileName.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const SolicitationDetails = ({ solicitation }: Props) => {
  const handleBack = () => {
    router.get("/solicitacoes");
  };

  const handleDownload = (type: string) => {
    window.location.href = `/solicitacao/${solicitation.id}/download/${type}`;
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-[#0284C7]">
                Detalhes da Solicitação
              </h1>
              <p className="text-sm text-gray-500">
                Visualize todos os detalhes da solicitação de indenização
              </p>
            </div>
          </div>
          <Separator />
        </div>

        <div className="mt-6 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="mt-1 font-mono text-sm">{solicitation.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge className={getStatusColor(solicitation.status)}>
                    {getStatusLabel(solicitation.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Motivo</p>
                  <p className="mt-1">{solicitation.motivo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Número do Voo</p>
                  <p className="mt-1">{solicitation.num_voo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Data do Voo</p>
                  <p className="mt-1">
                    {format(new Date(solicitation.dta_voo), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm font-medium text-gray-500">Detalhes</p>
                <p className="mt-1 whitespace-pre-wrap">{solicitation.detalhe}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Registro de Nascimento</p>
                    <p className="text-sm text-gray-500">
                      {getFileName(solicitation.registro_nasc)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDownload('registro_nasc')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Comprovante de Residência</p>
                    <p className="text-sm text-gray-500">
                      {getFileName(solicitation.comprovante_res)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDownload('comprovante_res')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Comprovante do Voo</p>
                    <p className="text-sm text-gray-500">
                      {getFileName(solicitation.comprovante_voo)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDownload('comprovante_voo')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Datas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Criado em</p>
                  <p className="mt-1">
                    {format(new Date(solicitation.created_at), "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Atualizado em</p>
                  <p className="mt-1">
                    {format(new Date(solicitation.updated_at), "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SolicitationDetails;
