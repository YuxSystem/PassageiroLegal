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
import { Eye, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import AdminLayout from "@/components/AdminLayout";
import { Separator } from "@/components/ui/separator";
import { router } from "@inertiajs/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

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

interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
  next_page: number | null;
  previous_page: number | null;
}

interface Props {
  solicitations: Solicitation[];
  pagination: Pagination;
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

const getNextStatus = (currentStatus: string): string | null => {
  switch (currentStatus.toLowerCase()) {
    case "em aberto":
      return "Pendente";
    case "pendente":
      return "Finalizado";
    default:
      return null;
  }
};

const getPreviousStatus = (currentStatus: string): string | null => {
  switch (currentStatus.toLowerCase()) {
    case "pendente":
      return "Em aberto";
    case "finalizado":
      return "Pendente";
    default:
      return null;
  }
};

const Solicitations = ({ solicitations, pagination }: Props) => {
  const [selectedSolicitation, setSelectedSolicitation] = useState<Solicitation | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");

  const handlePageChange = (page: number) => {
    router.get(`/solicitacoes?page=${page}`);
  };

  const handlePerPageChange = (value: string) => {
    router.get(`/solicitacao?per_page=${value}`);
  };

  const handleViewSolicitation = (id: string) => {
    router.get(`/solicitacao/${id}`);
  };

  const handleStatusChange = (solicitation: Solicitation, status: string) => {
    setSelectedSolicitation(solicitation);
    setNewStatus(status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (!selectedSolicitation) return;

    router.put(`/solicitacao/${selectedSolicitation.id}/status`, {
      status: newStatus,
    }, {
      onSuccess: () => {
        setShowStatusModal(false);
        setSelectedSolicitation(null);
        setNewStatus("");
      },
    });
  };

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
                <TableHead>Motivo</TableHead>
                <TableHead>Voo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solicitations.map((solicitation) => (
                <TableRow key={solicitation.id}>
                  <TableCell className="font-mono text-sm">
                    {solicitation.id.slice(0, 8)}...
                  </TableCell>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="cursor-pointer">
                        <DropdownMenuItem onClick={() => handleViewSolicitation(solicitation.id)} className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        {getNextStatus(solicitation.status) && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(solicitation, getNextStatus(solicitation.status)!)
                            }
                            className="cursor-pointer"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Avançar para {getNextStatus(solicitation.status)}
                          </DropdownMenuItem>
                        )}
                        {getPreviousStatus(solicitation.status) && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(solicitation, getPreviousStatus(solicitation.status)!)
                            }
                            className="cursor-pointer"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Voltar para {getPreviousStatus(solicitation.status)}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              Mostrando {(pagination.current_page - 1) * pagination.per_page + 1} a{" "}
              {Math.min(pagination.current_page * pagination.per_page, pagination.total_items)} de{" "}
              {pagination.total_items} resultados
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Itens por página:</span>
              <Select
                value={pagination.per_page.toString()}
                onValueChange={handlePerPageChange}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.previous_page || 1)}
              disabled={!pagination.previous_page}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.next_page || pagination.total_pages)}
              disabled={!pagination.next_page}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar alteração de status</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja alterar o status da solicitação{" "}
              {selectedSolicitation?.id.slice(0, 8)}... para {newStatus}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmStatusChange}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Solicitations;
