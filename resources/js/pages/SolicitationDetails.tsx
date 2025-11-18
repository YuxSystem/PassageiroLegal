import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import AdminLayout from "@/components/layout/AdminLayout";
import { Separator } from "@/components/ui/separator";
import { Head, router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { ArrowLeft, Download, UserPlus, MessageSquare, History, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface StatusHistory {
  id: string;
  old_status: string | null;
  new_status: string;
  changed_by: {
    id: string;
    name: string;
  };
  created_at: string;
  notes?: string;
}

interface Comment {
  id: string;
  comment: string;
  is_internal: boolean;
  user: {
    id: string;
    name: string;
  };
  created_at: string;
}

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
  assigned_to?: string | null;
  assigned_by?: string | null;
  assigned_at?: string | null;
  assigned_to_user?: User | null;
  assigned_by_user?: User | null;
  validation_status?: string | null;
  validated_by?: string | null;
  validated_at?: string | null;
  validation_notes?: string | null;
  validated_by_user?: User | null;
  status_history?: StatusHistory[];
  comments?: Comment[];
  created_at: string;
  updated_at: string;
}

interface Props {
  solicitation: Solicitation;
  agents: User[];
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

const SolicitationDetails = ({ solicitation, agents }: Props) => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const dateLocale = locale === 'pt-BR' ? ptBR : enUS;
  const { user } = usePage().props.auth as any;
  const isAdmin = user?.role === "Admin";
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"Aprovado" | "Rejeitado">("Aprovado");
  const [validationNotes, setValidationNotes] = useState("");

  const { data: commentData, setData: setCommentData, post: postComment, processing: commentProcessing } = useForm({
    comment: "",
    is_internal: false,
  });

  const { data: validationData, setData: setValidationData, post: postValidation, processing: validationProcessing } = useForm({
    status: "Aprovado",
    notes: "",
  });

  const handleBack = () => {
    router.get("/solicitacoes");
  };

  const handleDownload = (type: string) => {
    window.location.href = `/admin/solicitacao/${solicitation.id}/download/${type}`;
  };

  const handleAssign = () => {
    if (!selectedAgent) return;
    router.post(`/admin/solicitacao/${solicitation.id}/atribuir`, {
      agent_id: selectedAgent,
    }, {
      onSuccess: () => {
        setShowAssignDialog(false);
        setSelectedAgent("");
        router.reload();
      },
    });
  };

  const handleAddComment = () => {
    postComment(`/admin/solicitacao/${solicitation.id}/comentario`, {
      onSuccess: () => {
        setShowCommentDialog(false);
        setCommentData({ comment: "", is_internal: false });
        setIsInternalComment(false);
        router.reload();
      },
    });
  };

  const handleValidate = () => {
    postValidation(`/admin/solicitacao/${solicitation.id}/validar`, {
      onSuccess: () => {
        setShowValidationDialog(false);
        setValidationData({ status: "Aprovado", notes: "" });
        router.reload();
      },
    });
  };

  return (
    <>
      <Head title={`Solicitação ${solicitation.id} | Passageiro Legal`} />

      <div className="px-2 sm:px-4 md:container mx-auto py-6 md:py-10">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.visit('/solicitacoes')}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold tracking-tight text-indigo-800">
                Solicitação {solicitation.id.slice(0, 8)}...
              </h1>
            </div>
            <p className="text-sm text-gray-500 ml-11">
              {t('solicitations.solicitationDetails')}
            </p>
          </div>
          <Separator />
        </div>

        <div className="mt-4 md:mt-6 space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('solicitations.generalInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="mt-1 font-mono text-sm">{solicitation.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('solicitations.status')}</p>
                  <Badge className={getStatusColor(solicitation.status)}>
                    {getStatusLabel(solicitation.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('solicitations.reason')}</p>
                  <p className="mt-1">{solicitation.motivo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('solicitations.flightNumber')}</p>
                  <p className="mt-1">{solicitation.num_voo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('solicitations.flightDate')}</p>
                  <p className="mt-1">
                    {format(new Date(solicitation.dta_voo), "dd/MM/yyyy", {
                      locale: dateLocale,
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('solicitations.additionalDetails')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('solicitations.details')}</p>
                <p className="mt-1 whitespace-pre-wrap">{solicitation.detalhe}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('solicitations.documents')}</CardTitle>
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
              <CardTitle>{t('solicitations.dates')}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('solicitations.createdAt')}</p>
                  <p className="mt-1">
                    {format(new Date(solicitation.created_at), "dd/MM/yyyy HH:mm", {
                      locale: dateLocale,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('solicitations.updatedAt')}</p>
                  <p className="mt-1">
                    {format(new Date(solicitation.updated_at), "dd/MM/yyyy HH:mm", {
                      locale: dateLocale,
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('solicitations.assignment')}</CardTitle>
                  {!solicitation.assigned_to && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAssignDialog(true)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t('solicitations.assignAgent')}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {solicitation.assigned_to ? (
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t('solicitations.assignedTo')}</p>
                      <p className="mt-1">{solicitation.assigned_to_user?.name || "N/A"}</p>
                    </div>
                    {solicitation.assigned_at && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('solicitations.assignedAt')}</p>
                        <p className="mt-1">
                          {format(new Date(solicitation.assigned_at), "dd/MM/yyyy HH:mm", {
                            locale: dateLocale,
                          })}
                        </p>
                      </div>
                    )}
                    {solicitation.assigned_by_user && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('solicitations.assignedBy')}</p>
                        <p className="mt-1">{solicitation.assigned_by_user.name}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">{t('solicitations.noAgentAssigned')}</p>
                )}
              </CardContent>
            </Card>
          )}

          {isAdmin && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('solicitations.validation')}</CardTitle>
                  {(!solicitation.validation_status || solicitation.validation_status === 'Pendente') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowValidationDialog(true)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      {t('solicitations.validateProcess')}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {solicitation.validation_status ? (
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t('solicitations.validationStatus')}</p>
                      <Badge className={solicitation.validation_status === 'Aprovado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {solicitation.validation_status}
                      </Badge>
                    </div>
                    {solicitation.validated_by_user && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('solicitations.validatedBy')}</p>
                        <p className="mt-1">{solicitation.validated_by_user.name}</p>
                      </div>
                    )}
                    {solicitation.validated_at && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('solicitations.validatedAt')}</p>
                        <p className="mt-1">
                          {format(new Date(solicitation.validated_at), "dd/MM/yyyy HH:mm", {
                            locale: dateLocale,
                          })}
                        </p>
                      </div>
                    )}
                    {solicitation.validation_notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('solicitations.observations')}</p>
                        <p className="mt-1 text-sm">{solicitation.validation_notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">{t('solicitations.pendingValidation')}</p>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('solicitations.statusHistory')}</CardTitle>
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCommentDialog(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t('solicitations.addComment')}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {solicitation.status_history && solicitation.status_history.length > 0 ? (
                <div className="space-y-4">
                  {solicitation.status_history.map((history) => (
                    <div key={history.id} className="flex gap-4 pb-4 border-b last:border-0">
                      <History className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(history.new_status)}>
                            {getStatusLabel(history.new_status)}
                          </Badge>
                          {history.old_status && (
                            <>
                              <span className="text-gray-400">→</span>
                              <span className="text-sm text-gray-500">
                                {getStatusLabel(history.old_status)}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {t('common.by')} <strong>{history.changed_by.name}</strong>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(history.created_at), "dd/MM/yyyy HH:mm", {
                            locale: dateLocale,
                          })}
                        </p>
                        {history.notes && (
                          <p className="text-sm text-gray-700 mt-2 italic">{history.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">{t('solicitations.noHistory')}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('solicitations.comments')}</CardTitle>
            </CardHeader>
            <CardContent>
              {solicitation.comments && solicitation.comments.length > 0 ? (
                <div className="space-y-4">
                  {solicitation.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-lg border ${
                        comment.is_internal
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">
                            {comment.user.name}
                            {comment.is_internal && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Interno
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(comment.created_at), "dd/MM/yyyy HH:mm", {
                              locale: dateLocale,
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>
                ) : (
                <p className="text-sm text-gray-500">{t('solicitations.noComments')}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('solicitations.assignProcess')}</DialogTitle>
            <DialogDescription>
              {t('solicitations.selectAgentToAssign')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder={t('solicitations.selectAgent')} />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name} ({agent.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleAssign} disabled={!selectedAgent}>
              {t('solicitations.assignAgent')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('solicitations.addCommentTitle')}</DialogTitle>
            <DialogDescription>
              {t('solicitations.addCommentDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder={t('solicitations.commentPlaceholder')}
              value={commentData.comment}
              onChange={(e) => setCommentData("comment", e.target.value)}
              rows={4}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="internal"
                checked={isInternalComment}
                onChange={(e) => {
                  setIsInternalComment(e.target.checked);
                  setCommentData("is_internal", e.target.checked);
                }}
                className="rounded border-gray-300"
              />
              <label htmlFor="internal" className="text-sm text-gray-700">
                {t('solicitations.internalComment')}
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCommentDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleAddComment}
              disabled={!commentData.comment.trim() || commentProcessing}
            >
              <Send className="h-4 w-4 mr-2" />
              {t('common.submit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('solicitations.validateProcessTitle')}</DialogTitle>
            <DialogDescription>
              {t('solicitations.validateProcessDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select
              value={validationData.status}
              onValueChange={(value) => setValidationData("status", value as "Aprovado" | "Rejeitado")}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('solicitations.selectStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aprovado">{t('solicitations.approve')}</SelectItem>
                <SelectItem value="Rejeitado">{t('solicitations.reject')}</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder={t('solicitations.validationObservations')}
              value={validationData.notes}
              onChange={(e) => setValidationData("notes", e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowValidationDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleValidate}
              disabled={validationProcessing}
              className={validationData.status === "Aprovado" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {validationData.status === "Aprovado" ? t('solicitations.approve') : t('solicitations.reject')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SolicitationDetails;
