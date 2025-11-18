<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificação - Passageiro Legal</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #4f46e5, #7c3aed); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Passageiro Legal</h1>
    </div>
    
    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1f2937; margin-top: 0;">Notificação Importante</h2>
        
        <p style="color: #4b5563; font-size: 16px;">
            {{ $message }}
        </p>
        
        <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 6px; border-left: 4px solid #4f46e5;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Lembrete:</strong> Você tem direitos garantidos pela Resolução nº 400 da ANAC em casos de problemas com voos.
            </p>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
            <a href="{{ config('app.url') }}/solicitacoes" 
               style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Acessar Minhas Solicitações
            </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
            Este é um email automático do sistema Passageiro Legal. Por favor, não responda este email.
        </p>
    </div>
</body>
</html>

