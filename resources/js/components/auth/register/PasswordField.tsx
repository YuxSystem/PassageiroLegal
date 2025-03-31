import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordRequirements } from "./PasswordRequirements";
import { PasswordStrength } from "./PasswordStrength";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const PasswordField = ({
  id,
  label,
  value,
  onChange,
  error,
  showPassword,
  onTogglePassword,
}: PasswordFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className={error ? "border-red-500" : ""}
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
      {id === "signup-password" && (
        <>
          <PasswordStrength password={value} />
          <PasswordRequirements password={value} />
        </>
      )}
    </div>
  );
};
