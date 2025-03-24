import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft, Shield, Check, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PlaneTakeoff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    if (pass.length >= 8) strength += 25;

    if (/[A-Z]/.test(pass)) strength += 25;

    if (/[a-z]/.test(pass)) strength += 25;

    if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)) strength += 25;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "Vazia";
    if (passwordStrength <= 25) return "Fraca";
    if (passwordStrength <= 50) return "Média";
    if (passwordStrength <= 75) return "Boa";
    return "Forte";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthIcon = () => {
    if (passwordStrength === 0) return null;
    if (passwordStrength <= 25) return <X className="h-4 w-4 text-red-500" />;
    if (passwordStrength <= 50) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    if (passwordStrength <= 75) return <Shield className="h-4 w-4 text-yellow-500" />;
    return <Check className="h-4 w-4 text-green-500" />;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "As senhas não coincidem",
        description: "Por favor, verifique se as senhas são iguais.",
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        variant: "destructive",
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos para continuar.",
      });
      return;
    }

    if (passwordStrength < 50) {
      toast({
        variant: "destructive",
        title: "Senha muito fraca",
        description: "Por favor, escolha uma senha mais forte para sua segurança.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Sua conta foi criada, você já pode fazer login.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Senha</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
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

                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Força da senha: {getPasswordStrengthLabel()}</span>
                    <span>{getPasswordStrengthIcon()}</span>
                  </div>
                  <Progress
                    value={passwordStrength}
                    className={`h-1.5 ${getPasswordStrengthColor()}`}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    <p>Sua senha deve conter:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      <li className={password.length >= 8 ? "text-green-600" : ""}>
                        No mínimo 8 caracteres
                      </li>
                      <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
                        Pelo menos uma letra maiúscula
                      </li>
                      <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>
                        Pelo menos uma letra minúscula
                      </li>
                      <li className={/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? "text-green-600" : ""}>
                        Pelo menos um número ou caractere especial
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirme a senha</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms(checked as boolean)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Aceito os termos de uso e a política de privacidade
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <a href="/login" className="text-sky-600 hover:underline font-medium">
                  Faça login
                </a>
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

export default Signup;
