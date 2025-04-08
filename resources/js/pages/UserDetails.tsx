import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Power, UserCog, ArrowLeft, Eye, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserModel } from '@/models/UserModel';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
  next_page: number | null;
  previous_page: number | null;
}

interface Props {
  user: UserModel;
  solicitations: any[];
  solicitations_pagination: Pagination;
}

interface Solicitation {
  id: string;
  status: string;
  created_at: string;
}

const getRoleLabel = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "Administrador";
    case "user":
      return "Usuário";
    default:
      return role;
  }
};

const UserDetails: React.FC<Props> = ({ user, solicitations, solicitations_pagination }) => {
  const [newRole, setNewRole] = useState(user.role);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedSolicitation, setSelectedSolicitation] = useState<Solicitation | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newSolicitationStatus, setNewSolicitationStatus] = useState<string>("");
  const IS_ADMIN = usePage().props.auth.user?.role === "Admin";

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const handleRoleChange = () => {
    router.put(`/admin/usuarios/${user.id}/role`, {
      role: newRole
    }, {
      onSuccess: () => {
        setOpenRoleModal(false);
        router.reload();
      }
    });
  };

  const handleToggleStatus = () => {
    router.put(`/admin/usuarios/${user.id}/toggle-status`, {}, {
      onSuccess: () => {
        setOpenStatusModal(false);
        router.reload();
      }
    });
  };

  const handleChangePage = (newPage: number) => {
    router.get(`/admin/usuarios/${user.id}`, {
      page: newPage,
      per_page: solicitations_pagination.per_page,
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };

  const handlePerPageChange = (value: string) => {
    router.get(`/admin/usuarios/${user.id}`, {
      per_page: value,
      page: 1,
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };

  const handleViewSolicitation = (id: string) => {
    router.get(`/solicitacao/${id}`);
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

  const handleStatusChange = (solicitation: Solicitation, status: string) => {
    setSelectedSolicitation(solicitation);
    setNewSolicitationStatus(status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (!selectedSolicitation) return;

    router.put(`/admin/solicitacao/${selectedSolicitation.id}/status`, {
      status: newSolicitationStatus,
    }, {
      onSuccess: () => {
        setShowStatusModal(false);
        setSelectedSolicitation(null);
        setNewSolicitationStatus("");
      },
    });
  };

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

  return (
    <>
      <Head title={`Detalhes do Usuário | Passageiro Legal`} />

      <div className="px-2 sm:px-4 md:container mx-auto py-6 md:py-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.get('/admin/usuarios')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-[#0284C7]">Detalhes do Usuário</h1>
              <p className="text-sm text-gray-500">
                Visualize e gerencie as informações do usuário
              </p>
            </div>
          </div>
          <Separator />
        </div>

        <div className="mt-4 md:mt-6 grid gap-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Dados principais do usuário no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">ID</Label>
                  <p className="font-mono text-sm">{user.id}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Status</Label>
                  <div>
                    <Badge
                      className={`inline-flex items-center px-3 py-1 ${user.status === "Enabled"
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                    >
                      {user.status === "Enabled" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Nome</Label>
                  <p className="font-medium">{user.name}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Email</Label>
                  <p className="font-medium">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Role</Label>
                  <p className="font-medium">{getRoleLabel(user.role)}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">CPF/CNPJ</Label>
                  <p className="font-medium">{user.legal_document || "-"}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Telefone</Label>
                  <p className="font-medium">{user.cellphone || "-"}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Data de Cadastro</Label>
                  <p className="font-medium">
                    {user.created_at ? format(new Date(user.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR }) : "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>Informações de localização do usuário</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Logradouro</Label>
                  <p className="font-medium">{user.street || "-"}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Cidade</Label>
                  <p className="font-medium">{user.city || "-"}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Estado</Label>
                  <p className="font-medium">{user.state || "-"}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">CEP</Label>
                  <p className="font-medium">{user.zipcode || "-"}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">País</Label>
                  <p className="font-medium">{user.country || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>Gerencie as permissões e status do usuário</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={() => setOpenRoleModal(true)}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Alterar Role
                </Button>

                <Button
                  variant={user.status === "Enabled" ? "destructive" : "default"}
                  onClick={() => setOpenStatusModal(true)}
                >
                  <Power className="h-4 w-4 mr-2" />
                  {user.status === "Enabled" ? "Inativar" : "Ativar"} Usuário
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Solicitações do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle>Solicitações</CardTitle>
              <CardDescription>Histórico de solicitações realizadas pelo usuário</CardDescription>
            </CardHeader>
            <CardContent>
              {solicitations.length > 0 ? (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {solicitations.map((solicitation) => (
                          <TableRow key={solicitation.id}>
                            <TableCell className="font-mono">
                              {solicitation.id.toString().slice(0, 8)}...
                            </TableCell>
                            <TableCell>
                              {format(new Date(solicitation.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
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
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-600">
                        Mostrando {(solicitations_pagination.current_page - 1) * solicitations_pagination.per_page + 1} a{" "}
                        {Math.min(solicitations_pagination.current_page * solicitations_pagination.per_page, solicitations_pagination.total_items)} de{" "}
                        {solicitations_pagination.total_items} resultados
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Itens por página:</span>
                        <Select
                          value={solicitations_pagination.per_page.toString()}
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
                        onClick={() => handleChangePage(solicitations_pagination.previous_page || 1)}
                        disabled={!solicitations_pagination.previous_page}
                      >
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleChangePage(solicitations_pagination.next_page || solicitations_pagination.total_pages)}
                        disabled={!solicitations_pagination.next_page}
                      >
                        Próximo
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <p className="text-sm text-gray-500">
                    Este usuário ainda não possui solicitações.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Alteração de Role */}
      <Dialog open={openRoleModal} onOpenChange={setOpenRoleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Role do Usuário</DialogTitle>
            <DialogDescription>
              Selecione a nova role para o usuário <span className="font-medium">{user.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Nova Role</Label>
              <Select
                value={newRole}
                onValueChange={setNewRole}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Administrador</SelectItem>
                  <SelectItem value="User">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRoleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleRoleChange}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Alteração de Status */}
      <AlertDialog open={openStatusModal} onOpenChange={setOpenStatusModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user.status === "Enabled" ? "Inativar" : "Ativar"} Usuário
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja {user.status === "Enabled" ? "inativar" : "ativar"} o usuário <span className="font-medium">{user.name}</span>?
              {user.status === "Enabled" && (
                <p className="mt-2 text-red-600">
                  Ao inativar, o usuário não poderá mais acessar o sistema.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenStatusModal(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleToggleStatus}
              className={user.status === "Enabled" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {user.status === "Enabled" ? "Inativar" : "Ativar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de Alteração de Status da Solicitação */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar alteração de status</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja alterar o status da solicitação{" "}
              {selectedSolicitation?.id.slice(0, 8)}... para {newSolicitationStatus}?
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

export default UserDetails;
