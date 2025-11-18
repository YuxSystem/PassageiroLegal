import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2, AlertCircle, Database, User, Settings, Check } from "lucide-react";
import axios from "axios";

interface Requirement {
  name: string;
  status: boolean;
  current?: string;
}

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export default function InstallIndex() {
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [allRequirementsOk, setAllRequirementsOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Detectar URL base automaticamente (incluindo subdiretórios)
  const getBaseUrl = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    // Se está em /install, remover isso para obter a base
    // Exemplo: /passageirolegal/install -> /passageirolegal
    const basePath = pathname.replace(/\/install.*$/, '') || '/';
    // Garantir que não termine com barra (exceto se for raiz)
    const cleanPath = basePath === '/' ? '' : basePath.replace(/\/$/, '');
    return origin + cleanPath;
  };

  const [envData, setEnvData] = useState({
    app_name: "Passageiro Legal",
    app_url: getBaseUrl(),
    db_host: "127.0.0.1",
    db_port: "3306",
    db_database: "passageiro_legal",
    db_username: "root",
    db_password: "",
  });

  const [adminData, setAdminData] = useState({
    name: "Administrador",
    email: "admin@passageirolegal.com.br",
    password: "",
    password_confirmation: "",
  });

  const steps: Step[] = [
    {
      id: "requirements",
      title: "Requisitos do Sistema",
      description: "Verificando requisitos do servidor",
      completed: false,
      active: currentStep === 0,
    },
    {
      id: "environment",
      title: "Configuração do Ambiente",
      description: "Configurando arquivo .env",
      completed: false,
      active: currentStep === 1,
    },
    {
      id: "database",
      title: "Banco de Dados",
      description: "Testando conexão e executando migrations",
      completed: false,
      active: currentStep === 2,
    },
    {
      id: "admin",
      title: "Usuário Administrador",
      description: "Criando conta de administrador",
      completed: false,
      active: currentStep === 3,
    },
    {
      id: "finish",
      title: "Finalização",
      description: "Concluindo instalação",
      completed: false,
      active: currentStep === 4,
    },
  ];

  useEffect(() => {
    checkRequirements();
  }, []);

  const checkRequirements = async () => {
    try {
      const response = await axios.get("/install/requirements");
      const reqs = Object.values(response.data.requirements) as Requirement[];
      setRequirements(reqs);
      setAllRequirementsOk(response.data.all_ok);
      
      if (response.data.all_ok) {
        setSuccess("Todos os requisitos foram atendidos!");
        setTimeout(() => {
          setCurrentStep(1);
        }, 1500);
      }
    } catch (err: any) {
      setError("Erro ao verificar requisitos: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEnvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post("/install/env", envData);
      setSuccess("Arquivo .env configurado com sucesso!");
      setTimeout(() => {
        setCurrentStep(2);
      }, 1500);
    } catch (err: any) {
      setError("Erro ao configurar .env: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const testDatabase = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post("/install/database/test", envData);
      setSuccess("Conexão com o banco de dados estabelecida!");
      
      // Executar migrations
      await axios.post("/install/migrations");
      setSuccess("Migrations executadas com sucesso!");
      
      setTimeout(() => {
        setCurrentStep(3);
      }, 1500);
    } catch (err: any) {
      setError("Erro: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (adminData.password !== adminData.password_confirmation) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (adminData.password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/install/admin", adminData);
      setSuccess("Usuário administrador criado com sucesso!");
      
      setTimeout(() => {
        finishInstallation();
      }, 1500);
    } catch (err: any) {
      setError("Erro ao criar usuário: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const finishInstallation = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post("/install/finish");
      setSuccess("Instalação concluída com sucesso!");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setError("Erro ao finalizar instalação: " + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  return (
    <>
      <Head title="Instalação - Passageiro Legal" />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">
              Instalação do Passageiro Legal
            </h1>
            <p className="text-gray-600">
              Configure sua aplicação em poucos passos
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        step.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : step.active
                          ? "bg-indigo-500 border-indigo-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-sm font-medium ${
                          step.active ? "text-indigo-600" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        step.completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              {/* Step 0: Requirements */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Requisitos do Sistema</h3>
                  <div className="space-y-2">
                    {requirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          {req.status ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className={req.status ? "text-gray-700" : "text-red-600"}>
                            {req.name}
                          </span>
                        </div>
                        {req.current && (
                          <span className="text-sm text-gray-500">{req.current}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {allRequirementsOk && (
                    <Button
                      onClick={() => setCurrentStep(1)}
                      className="w-full mt-4"
                      disabled={loading}
                    >
                      Continuar
                    </Button>
                  )}
                </div>
              )}

              {/* Step 1: Environment */}
              {currentStep === 1 && (
                <form onSubmit={handleEnvSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="app_name">Nome da Aplicação</Label>
                      <Input
                        id="app_name"
                        value={envData.app_name}
                        onChange={(e) =>
                          setEnvData({ ...envData, app_name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="app_url">URL da Aplicação</Label>
                      <Input
                        id="app_url"
                        type="url"
                        value={envData.app_url}
                        onChange={(e) =>
                          setEnvData({ ...envData, app_url: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Configurações do Banco de Dados
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="db_host">Host</Label>
                        <Input
                          id="db_host"
                          value={envData.db_host}
                          onChange={(e) =>
                            setEnvData({ ...envData, db_host: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="db_port">Porta</Label>
                        <Input
                          id="db_port"
                          type="number"
                          value={envData.db_port}
                          onChange={(e) =>
                            setEnvData({ ...envData, db_port: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="db_database">Banco de Dados</Label>
                        <Input
                          id="db_database"
                          value={envData.db_database}
                          onChange={(e) =>
                            setEnvData({ ...envData, db_database: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="db_username">Usuário</Label>
                        <Input
                          id="db_username"
                          value={envData.db_username}
                          onChange={(e) =>
                            setEnvData({ ...envData, db_username: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="db_password">Senha</Label>
                        <Input
                          id="db_password"
                          type="password"
                          value={envData.db_password}
                          onChange={(e) =>
                            setEnvData({ ...envData, db_password: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(0)}
                    >
                      Voltar
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        "Salvar e Continuar"
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 2: Database */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Testando conexão com o banco de dados e executando migrations...
                  </p>
                  <Button
                    onClick={testDatabase}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Database className="mr-2 h-4 w-4" />
                        Testar e Executar Migrations
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="w-full"
                  >
                    Voltar
                  </Button>
                </div>
              )}

              {/* Step 3: Admin */}
              {currentStep === 3 && (
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Criar Usuário Administrador</h3>
                  </div>

                  <div>
                    <Label htmlFor="admin_name">Nome</Label>
                    <Input
                      id="admin_name"
                      value={adminData.name}
                      onChange={(e) =>
                        setAdminData({ ...adminData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="admin_email">Email</Label>
                    <Input
                      id="admin_email"
                      type="email"
                      value={adminData.email}
                      onChange={(e) =>
                        setAdminData({ ...adminData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="admin_password">Senha</Label>
                    <Input
                      id="admin_password"
                      type="password"
                      value={adminData.password}
                      onChange={(e) =>
                        setAdminData({ ...adminData, password: e.target.value })
                      }
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo de 8 caracteres
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="admin_password_confirmation">Confirmar Senha</Label>
                    <Input
                      id="admin_password_confirmation"
                      type="password"
                      value={adminData.password_confirmation}
                      onChange={(e) =>
                        setAdminData({
                          ...adminData,
                          password_confirmation: e.target.value,
                        })
                      }
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Voltar
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        "Criar Administrador"
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 4: Finish */}
              {currentStep === 4 && (
                <div className="text-center space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Instalação Concluída!
                  </h3>
                  <p className="text-gray-600">
                    Sua aplicação está pronta para uso. Você será redirecionado para a página de login.
                  </p>
                  {loading && (
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Finalizando...</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

