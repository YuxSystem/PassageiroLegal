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
import { Eye, MoreVertical, CheckCircle2, XCircle, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { Head, router, usePage } from "@inertiajs/react";
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

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-50 rounded-full p-4 mb-4">
        <ClipboardList className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma solicitação encontrada</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        Não existem solicitações de indenização registradas no momento.
      </p>
    </div>
  );
};

const Solicitations = ({ solicitations, pagination }: Props) => {
  const [selectedSolicitation, setSelectedSolicitation] = useState<Solicitation | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const IS_ADMIN = usePage().props.auth.user?.role === "Admin";

  const handlePageChange = (page: number) => {
    router.get('/solicitacoes', {
      page,
      per_page: pagination.per_page
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };

  const handlePerPageChange = (value: string) => {
    router.get('/solicitacoes', {
      per_page: value,
      page: 1
    }, {
      preserveState: true,
      preserveScroll: true
    });
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
    <>
      <Head title="Solicitações | Passageiro Legal" />

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
          {solicitations.length > 0 ? (
            <>
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
                            {IS_ADMIN && getNextStatus(solicitation.status) && (
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
                            {IS_ADMIN && getPreviousStatus(solicitation.status) && (
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

              <div className="flex justify-between items-center p-4 border-t border-gray-100">
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
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
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
            </>
          ) : (
            <EmptyState />
          )}
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
    </>
  );
};

export default Solicitations;
