import React from 'react';
import { Upload } from 'lucide-react';
import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DocumentsStepProps {
  registroNacional: File | null;
  comprovanteResidencia: File | null;
  passagemAerea: File | null;
  onRegistroNacionalChange: (file: File | null) => void;
  onComprovanteResidenciaChange: (file: File | null) => void;
  onPassagemAereaChange: (file: File | null) => void;
  onBack: () => void;
  onNext: () => void;
  errors?: {
    registroNacional?: string;
    comprovanteResidencia?: string;
    passagemAerea?: string;
  };
}

export function DocumentsStep({
  registroNacional,
  comprovanteResidencia,
  passagemAerea,
  onRegistroNacionalChange,
  onComprovanteResidenciaChange,
  onPassagemAereaChange,
  onBack,
  onNext,
  errors,
}: DocumentsStepProps) {
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0] || null;
    setFile(file);
  };

  const FileUploadField = ({
    id,
    label,
    file,
    onChange,
    error,
  }: {
    id: string;
    label: string;
    file: File | null;
    onChange: (file: File | null) => void;
    error?: string;
  }) => (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className={cn(
        "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:border-sky-600 transition-colors",
        error && "border-red-500"
      )}>
        <div className="bg-indigo-50 p-2 rounded-full">
          <Upload className="h-6 w-6 text-sky-600" />
        </div>
        <label
          htmlFor={id}
          className="text-sm text-center cursor-pointer"
        >
          <span className="text-sky-600 hover:underline">
            Upload a file
          </span>
          <span className="text-gray-500"> ou arraste e solte</span>
          <p className="text-xs text-gray-500 mt-1">
            PDF, PNG, JPG, GIF até 10MB
          </p>
        </label>
        <input
          type="file"
          id={id}
          className="hidden"
          onChange={(e) => handleFileUpload(e, onChange)}
          accept=".pdf,.png,.jpg,.jpeg,.gif"
        />
        {file && (
          <p className="text-xs text-gray-500 truncate max-w-full">
            {file.name}
          </p>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );

  return (
    <>
      <CardHeader>
        <CardTitle>Envio de Documentos</CardTitle>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">
          Envie os documentos necessários para análise de sua solicitação.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileUploadField
              id="registroNacional"
              label="Registro Nacional"
              file={registroNacional}
              onChange={onRegistroNacionalChange}
              error={errors?.registroNacional}
            />
            <FileUploadField
              id="comprovanteResidencia"
              label="Comprovante de Residência"
              file={comprovanteResidencia}
              onChange={onComprovanteResidenciaChange}
              error={errors?.comprovanteResidencia}
            />
            <FileUploadField
              id="passagemAerea"
              label="Cópia da Passagem Aérea"
              file={passagemAerea}
              onChange={onPassagemAereaChange}
              error={errors?.passagemAerea}
            />
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={onBack}>
              Voltar
            </Button>
            <Button
              onClick={onNext}
              disabled={!registroNacional || !comprovanteResidencia || !passagemAerea}
            >
              Próximo
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
