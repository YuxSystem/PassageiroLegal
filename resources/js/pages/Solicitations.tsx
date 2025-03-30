import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import AdminLayout from "@/components/AdminLayout";
import { Separator } from "@/components/ui/separator";

interface Solicitation {
  id: string;
  user: {
    name: string;
  };
  motivo: string;
  num_voo: string;
  dta_voo: string;
  status: string;
}

const mockSolicitations: Solicitation[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    user: {
      name: "João Silva",
    },
    motivo: "Cancelamento de Voo",
    num_voo: "LA 3500",
    dta_voo: "2024-04-15",
    status: "pendente",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    user: {
      name: "Maria Santos",
    },
    motivo: "Atraso de Voo",
    num_voo: "G3 1234",
    dta_voo: "2024-04-16",
    status: "aprovado",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    user: {
      name: "Pedro Oliveira",
    },
    motivo: "Overbooking",
    num_voo: "AD 4321",
    dta_voo: "2024-04-17",
    status: "rejeitado",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pendente":
      return "bg-yellow-100 text-yellow-800";
    case "aprovado":
      return "bg-green-100 text-green-800";
    case "rejeitado":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "aprovado":
      return "Aprovado";
    case "rejeitado":
      return "Rejeitado";
    default:
      return status;
  }
};

const Solicitations = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-[#0284C7]">Solicitações</h1>
            <p className="text-sm text-gray-500">
              Gerencie todas as solicitações de indenização
            </p>
          </div>
          <Separator />
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md border border-gray-100">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Voo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSolicitations.map((solicitation) => (
                <TableRow key={solicitation.id}>
                  <TableCell className="font-mono text-sm">
                    {solicitation.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{solicitation.user.name}</TableCell>
                  <TableCell>{solicitation.motivo}</TableCell>
                  <TableCell>{solicitation.num_voo}</TableCell>
                  <TableCell>
                    {format(new Date(solicitation.dta_voo), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(solicitation.status)}>
                      {getStatusLabel(solicitation.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-sky-600 hover:text-sky-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Mostrando 1 a 3 de 3 resultados
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Solicitations;
