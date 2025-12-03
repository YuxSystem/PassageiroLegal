import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  User,
  Users,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

interface Stats {
  total_solicitations: number;
  open_solicitations: number;
  pending_solicitations: number;
  finished_solicitations: number;
  unassigned_solicitations: number;
  total_users: number;
  total_agents: number;
  solicitations_by_reason: Record<string, number>;
  solicitations_by_status: Record<string, number>;
  recent_solicitations: Array<{
    id: string;
    motivo: string;
    status: string;
    user_name: string;
    assigned_to: string | null;
    created_at: string;
  }>;
}

interface Props {
  stats: Stats;
}

const Dashboard = ({ stats }: Props) => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const dateLocale = locale === 'pt-BR' ? ptBR : enUS;

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
      <Head title="Dashboard | Passageiro Legal" />

      <div className="px-2 sm:px-4 md:container mx-auto py-6 md:py-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-indigo-800">{t('dashboard.title')}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {t('dashboard.subtitle')}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('dashboard.totalSolicitations')}</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_solicitations}</div>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.allRegistered')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('dashboard.open')}</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.open_solicitations}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.awaitingProcessing')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('dashboard.pending')}</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending_solicitations}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.inAnalysis')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('dashboard.finished')}</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.finished_solicitations}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.processesCompleted')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{t('dashboard.unassigned')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.unassigned_solicitations}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('dashboard.processesWithoutAgent')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{t('dashboard.users')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div className="text-2xl font-bold">{stats.total_users}</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('dashboard.registeredPassengers')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{t('dashboard.agents')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="text-2xl font-bold">{stats.total_agents}</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('dashboard.activeAgents')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.byReason')}</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(stats.solicitations_by_reason).length > 0 ? (
                  <ChartContainer
                    config={{
                      motivo: {
                        label: "Motivo",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <BarChart data={Object.entries(stats.solicitations_by_reason).map(([name, value]) => ({ name, value }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-motivo)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                ) : (
                  <p className="text-sm text-gray-500">{t('dashboard.noData')}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.byStatus')}</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(stats.solicitations_by_status).length > 0 ? (
                  <ChartContainer
                    config={{
                      status: {
                        label: "Status",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <PieChart>
                      <Pie
                        data={Object.entries(stats.solicitations_by_status).map(([name, value]) => ({ name, value }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.entries(stats.solicitations_by_status).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "#3b82f6" : index === 1 ? "#eab308" : "#22c55e"} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                ) : (
                  <p className="text-sm text-gray-500">{t('dashboard.noData')}</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.recent')}</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recent_solicitations.length > 0 ? (
                <div className="space-y-4">
                  {stats.recent_solicitations.map((solicitation) => (
                    <div
                      key={solicitation.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-gray-500">
                            {solicitation.id.slice(0, 8)}...
                          </span>
                          <Badge className={getStatusColor(solicitation.status)}>
                            {getStatusLabel(solicitation.status)}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{solicitation.motivo}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Por: {solicitation.user_name}</span>
                          {solicitation.assigned_to && (
                            <span>Atribuído: {solicitation.assigned_to}</span>
                          )}
                          <span>
                            {format(new Date(solicitation.created_at), "dd/MM/yyyy HH:mm", {
                              locale: dateLocale,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                ) : (
                  <p className="text-sm text-gray-500">{t('dashboard.noRecent')}</p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

