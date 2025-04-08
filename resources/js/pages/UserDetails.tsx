import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Power, UserCog, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserModel } from '@/models/UserModel';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  user: UserModel;
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

const UserDetails: React.FC<Props> = ({ user }) => {
  const [newRole, setNewRole] = useState(user.role);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);

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
    </>
  );
};

export default UserDetails;
