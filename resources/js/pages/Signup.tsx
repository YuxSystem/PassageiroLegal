import { useState, useEffect } from "react";
import { ArrowLeft, Shield, PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm } from '@inertiajs/react';
import { PasswordField } from "@/components/auth/register/PasswordField";
import { TermsCheckbox } from "@/components/auth/register/TermsCheckbox";
import { calculatePasswordStrength } from "@/utils/passwordStrength";

const Signup = () => {
  const { data, setData, processing, post, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    acceptedTerms: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(data.password));
  }, [data.password]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    post("/register");
  };

  return (
    <>
      <Head title="Cadastro | Passageiro Legal" />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Link href="/" className="inline-flex items-center justify-center">
                <PlaneTakeoff className="h-8 w-8 text-sky-600" />
                <span className="ml-2 text-2xl font-bold">Passageiro Legal</span>
              </Link>
              <h1 className="mt-6 text-3xl font-bold">Crie sua conta</h1>
              <p className="mt-2 text-gray-600">
                Cadastre-se para começar a resolver seus problemas com voos
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <PasswordField
                  id="signup-password"
                  label="Senha"
                  value={data.password}
                  onChange={(value) => setData("password", value)}
                  error={errors.password}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

                <PasswordField
                  id="confirm-password"
                  label="Confirme a senha"
                  value={data.password_confirmation}
                  onChange={(value) => setData("password_confirmation", value)}
                  error={errors.password_confirmation}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

                <TermsCheckbox
                  checked={data.acceptedTerms}
                  onChange={(checked) => setData("acceptedTerms", checked)}
                  error={errors.acceptedTerms}
                />

                <Button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700"
                  disabled={processing}
                >
                  {processing ? "Criando conta..." : "Criar conta"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-sky-600 hover:underline font-medium">
                    Faça login
                  </Link>
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-sky-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Seus dados estão protegidos e nunca serão compartilhados com terceiros sem
                    sua autorização explícita.
                  </p>
                </div>
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
    </>

  );
};

export default Signup;
