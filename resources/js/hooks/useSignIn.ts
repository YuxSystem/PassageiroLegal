import {useMutation} from "@tanstack/react-query";
import { signIn } from "@/services/auth";
import {CredentialsModel} from "@/models/CredentialsModel.ts";
import {useToast} from "@/hooks/use-toast.ts";

export const useSignIn = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: (credentials: CredentialsModel) => signIn(credentials),
    onSuccess: () => {
      toast({
        title: "Login bem-sucedido",
        description: "Você está sendo redirecionado para sua conta.",
      });
    },
    onError: () => {
      console.log("error")
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
      });
    }
  })
}
