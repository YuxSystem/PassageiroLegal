import React, { useState, useEffect, useCallback } from 'react';
import { Head, router } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoreVertical, UserCog, Power, Users2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { UserModel } from '@/models/UserModel';

interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
  next_page: number | null;
  previous_page: number | null;
}

interface Props {
  users: UserModel[];
  pagination: Pagination;
  search?: string;
}

interface EmptyStateProps {
  searchTerm: string;
  handleSearch: (value: string) => void;
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

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, handleSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-50 rounded-full p-4 mb-4">
        <Users2 className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum usuário encontrado</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-4">
        Não existem usuários registrados no momento.
      </p>
      <div className="w-full max-w-md">
        <Input
          placeholder="Buscar por ID, email ou nome"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

const Users: React.FC<Props> = ({ users: initialUsers, pagination, search: initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [newRole, setNewRole] = useState('');

  // Efeito para debounce da busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Efeito para realizar a busca quando o termo debounced mudar
  useEffect(() => {
    router.get('/admin/usuarios', {
      search: debouncedSearchTerm,
      page: pagination.current_page,
      per_page: pagination.per_page
    }, {
      preserveState: true,
      preserveScroll: true
    });
  }, [debouncedSearchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleChangePage = (newPage: number) => {
    router.get('/admin/usuarios', {
      page: newPage,
      per_page: pagination.per_page,
      search: searchTerm
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };

  const handlePerPageChange = (value: string) => {
    router.get('/admin/usuarios', {
      per_page: value,
      page: 1,
      search: searchTerm
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };

  const handleOpenModal = (user: UserModel) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleConfirmRoleChange = () => {
    if (!selectedUser) return;

    router.put(`/admin/usuarios/${selectedUser.id}/role`, {
      role: newRole
    }, {
      onSuccess: () => {
        handleCloseModal();
        router.reload();
      }
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    router.put(`/admin/usuarios/${userId}/toggle-status`, {}, {
      onSuccess: () => {
        router.reload();
      }
    });
  };

  return (
    <>
      <Head title="Usuários | Passageiro Legal" />

      <div className="px-2 sm:px-4 md:container mx-auto py-6 md:py-10">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-indigo-800">Usuários</h1>
            <p className="text-sm text-gray-500">
              Gerencie todos os usuários do sistema
            </p>
          </div>
          <Separator />
        </div>

        <div className="mt-4 md:mt-6 bg-white rounded-lg shadow-md border border-gray-100">
          {initialUsers.length > 0 ? (
            <>
              <div className="flex gap-4 p-4 md:p-6 border-b border-gray-100">
                <Input
                  placeholder="Buscar por ID, email ou nome"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-sm">
                        {user.id.toString().slice(0, 8)}...
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleLabel(user.role)}</TableCell>
                      <TableCell>
                        <Badge
                          className={user.status === "Enabled"
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                          }
                        >
                          {user.status === "Enabled" ? "Ativo" : "Inativo"}
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
                            <DropdownMenuItem onClick={() => router.get(`/admin/usuarios/${user.id}`)} className="cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenModal(user)} className="cursor-pointer">
                              <UserCog className="h-4 w-4 mr-2" />
                              Alterar Role
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className={`cursor-pointer ${user.status === "Enabled" ? "text-red-600" : ""}`}
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Power className="h-4 w-4 mr-2" />
                                  {user.status === "Enabled" ? "Inativar" : "Ativar"}
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    {user.status === "Enabled" ? "Inativar" : "Ativar"} Usuário
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja {user.status === "Enabled" ? "inativar" : "ativar"} o usuário {user.name}?
                                    {user.status === "Enabled" && " O usuário não poderá mais acessar o sistema."}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleToggleUserStatus(user.id)}
                                    className={user.status === "Enabled" ? "bg-red-600 hover:bg-red-700" : ""}
                                  >
                                    {user.status === "Enabled" ? "Inativar" : "Ativar"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
                    onClick={() => handleChangePage(pagination.previous_page || 1)}
                    disabled={!pagination.previous_page}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangePage(pagination.next_page || pagination.total_pages)}
                    disabled={!pagination.next_page}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState searchTerm={searchTerm} handleSearch={handleSearch} />
          )}
        </div>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Alterar Role do Usuário</DialogTitle>
              <DialogDescription>
                Usuário: {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Nova Role</Label>
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
              <Button variant="outline" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmRoleChange}>
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Users;
