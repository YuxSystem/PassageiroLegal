import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaneTakeoff } from "lucide-react";
import { Head, Link, useForm } from '@inertiajs/react'
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
  [key: string]: string | boolean;
}

const Login = () => {
  const { data, setData, post, processing, errors, reset } = useForm<LoginFormData>({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    post("/login", {
      onError: () => {
        reset('password');
      }
    });
  };

  return (
    <>
      <Head title="Login | Passageiro Legal" />

      <div className="px-2 sm:px-4 md:container mx-auto py-6 md:py-10">
        <div className="flex min-h-[calc(100vh-200px)] flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex flex-col items-center gap-2">
              <Link href="/">
                <PlaneTakeoff className="h-10 w-10 text-sky-600" />
              </Link>
              <h2 className="text-2xl font-semibold tracking-tight">
                Bem-vindo de volta
              </h2>
              <p className="text-sm text-muted-foreground">
                Entre com sua conta para continuar
              </p>
            </div>

            <div className="mt-4 md:mt-6">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
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
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
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

                    {(errors as any).error && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          {(errors as any).error}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={data.remember}
                      onCheckedChange={(checked: boolean) => setData('remember', checked)}
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Manter conectado
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-indigo-800 hover:bg-indigo-700"
                    disabled={processing}
                  >
                    {processing ? "Entrando..." : "Entrar"}
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
      </div>
    </>
  );
};

export default Login;
