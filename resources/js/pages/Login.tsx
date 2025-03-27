
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaneTakeoff } from "lucide-react";
import { useSignIn } from "@/hooks/useSignIn";
import {CredentialsModel} from "@/models/CredentialsModel";
import { Link } from '@inertiajs/react'
import {useToast} from "@/hooks/use-toast.ts";


const Login = () => {
  const [credentials, setCredentials] = useState<CredentialsModel>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useSignIn();
  const { toast } = useToast();

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setCredentials(values => ({
      ...values,
      [key]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(credentials)

    toast({
      title: "Login bem-sucedido",
      description: "Você está sendo redirecionado para sua conta.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center justify-center">
              <PlaneTakeoff className="h-8 w-8 text-sky-600" />
              <span className="ml-2 text-2xl font-bold">Passageiro Legal</span>
            </Link>
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
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/recuperar-senha" className="text-sm text-sky-600 hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
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
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Ainda não tem uma conta?{" "}
                <Link href="/cadastro" className="text-sky-600 hover:underline font-medium">Cadastre-se</Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center text-sky-600 hover:text-sky-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
