interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  return (
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
        <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>
          Pelo menos um número
        </li>
        <li className={/[@$!%*#?&]/.test(password) ? "text-green-600" : ""}>
          Pelo menos um caractere especial (@$!%*#?&)
        </li>
        <li className={!/(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)/.test(password) ? "text-green-600" : ""}>
          Não pode conter números sequenciais
        </li>
      </ul>
    </div>
  );
};
