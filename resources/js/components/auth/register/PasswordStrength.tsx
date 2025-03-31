import { Progress } from "@/components/ui/progress";
import { calculatePasswordStrength, getPasswordStrengthInfo } from "@/utils/passwordStrength";
import { Shield, Check, X, AlertTriangle } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const strength = calculatePasswordStrength(password);
  const { label, color } = getPasswordStrengthInfo(strength);

  const getIcon = () => {
    if (strength === 0) return null;
    if (strength <= 25) return <X className="h-4 w-4 text-red-500" />;
    if (strength <= 50) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    if (strength <= 75) return <Shield className="h-4 w-4 text-blue-500" />;
    return <Check className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Força da senha: {label}</span>
        <span>{getIcon()}</span>
      </div>
      <Progress
        value={strength}
        className={`h-1.5 ${color}`}
      />
    </div>
  );
};
