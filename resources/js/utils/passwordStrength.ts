import { Shield, Check, X, AlertTriangle } from "lucide-react";

export interface PasswordStrengthResult {
  strength: number;
  label: string;
  color: string;
}

export const calculatePasswordStrength = (pass: string): number => {
  if (!pass) return 0;

  let strength = 0;
  const length = pass.length;
  const hasUpperCase = /[A-Z]/.test(pass);
  const hasLowerCase = /[a-z]/.test(pass);
  const hasNumbers = /[0-9]/.test(pass);
  const hasSpecialChars = /[@$!%*#?&]/.test(pass);
  const hasSequentialNumbers = /(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)/.test(pass);

  // Pontuação por comprimento (máximo 25 pontos)
  strength += Math.min(length * 2, 25);

  // Pontuação por complexidade (máximo 75 pontos)
  if (hasUpperCase) strength += 15;
  if (hasLowerCase) strength += 15;
  if (hasNumbers) strength += 15;
  if (hasSpecialChars) strength += 15;
  if (!hasSequentialNumbers) strength += 15;

  return strength;
};

export const getPasswordStrengthInfo = (strength: number): PasswordStrengthResult => {
  let label = "Vazia";
  let color = "bg-gray-200";

  if (strength > 0) {
    if (strength <= 25) {
      label = "Fraca";
      color = "bg-red-500";
    } else if (strength <= 50) {
      label = "Média";
      color = "bg-yellow-500";
    } else if (strength <= 75) {
      label = "Boa";
      color = "bg-blue-500";
    } else {
      label = "Forte";
      color = "bg-green-500";
    }
  }

  return { strength, label, color };
};
