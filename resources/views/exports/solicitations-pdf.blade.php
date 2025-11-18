<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Relatório de Solicitações - Passageiro Legal</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 20px;
        }
        h1 {
            color: #4f46e5;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #4f46e5;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f9fafb;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>Relatório de Solicitações - Passageiro Legal</h1>
    <p><strong>Data de geração:</strong> {{ now()->format('d/m/Y H:i:s') }}</p>
    <p><strong>Total de solicitações:</strong> {{ $solicitations->count() }}</p>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Motivo</th>
                <th>Número do Voo</th>
                <th>Data do Voo</th>
                <th>Status</th>
                <th>Atribuído Para</th>
                <th>Data de Criação</th>
            </tr>
        </thead>
        <tbody>
            @foreach($solicitations as $solicitation)
            <tr>
                <td>{{ substr($solicitation->id, 0, 8) }}...</td>
                <td>{{ $solicitation->user->name ?? 'N/A' }}</td>
                <td>{{ $solicitation->motivo }}</td>
                <td>{{ $solicitation->num_voo }}</td>
                <td>{{ $solicitation->dta_voo?->format('d/m/Y') ?? 'N/A' }}</td>
                <td>{{ $solicitation->status }}</td>
                <td>{{ $solicitation->assignedTo->name ?? 'Não atribuído' }}</td>
                <td>{{ $solicitation->created_at->format('d/m/Y H:i') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Gerado automaticamente pelo sistema Passageiro Legal</p>
        <p>Baseado na Resolução nº 400 da ANAC</p>
    </div>
</body>
</html>

