
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PlaneTakeoff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Login logic would go here
      // For now, simulate a delay and show a toast
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Login bem-sucedido",
        description: "Você está sendo redirecionado para sua conta.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <a href="/" className="inline-flex items-center justify-center">
              <PlaneTakeoff className="h-8 w-8 text-sky-600" />
              <span className="ml-2 text-2xl font-bold">Passageiro Legal</span>
            </a>
            <h1 className="mt-6 text-3xl font-bold">Bem-vindo de volta</h1>
            <p className="mt-2 text-gray-600">
              Entre na sua conta para acessar seus processos
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="/recuperar-senha" className="text-sm text-sky-600 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Ainda não tem uma conta?{" "}
                <a href="/cadastro" className="text-sky-600 hover:underline font-medium">Cadastre-se</a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/" className="inline-flex items-center text-sky-600 hover:text-sky-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para a página inicial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
