import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  checked: boolean | null;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const TermsCheckbox = ({ checked, onChange, error }: TermsCheckboxProps) => {
  return (
    <div className="flex items-start space-x-2 pt-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(checked) => onChange(checked as boolean)}
        className={error ? "border-red-500" : ""}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Aceito os termos de uso e a política de privacidade
        </label>
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};
