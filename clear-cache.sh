#!/bin/bash

# Definir cores para saída do terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # Sem cor

# Função para verificar se o comando foi bem-sucedido
executar_comando() {
    echo -e "${GREEN}Executando: $1${NC}"
    eval $1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Sucesso: $1${NC}"
    else
        echo -e "${RED}❌ Erro ao executar: $1${NC}"
    fi
    echo ""
}

echo -e "${GREEN}🚀 Iniciando a limpeza de cache do Laravel...${NC}"

# Navegar para o diretório do Laravel (ajuste conforme necessário)
cd "$(dirname "$0")"

# Limpar cache da aplicação
executar_comando "php artisan cache:clear"

# Limpar cache de configuração
executar_comando "php artisan config:clear"

# Limpar cache de rotas
executar_comando "php artisan route:clear"

# Limpar cache de views (Blade)
executar_comando "php artisan view:clear"

# Limpar cache de eventos
executar_comando "php artisan event:clear"

# Remover arquivos de cache manualmente
executar_comando "rm -rf bootstrap/cache/*"

echo -e "${GREEN}🎉 Limpeza concluída com sucesso!${NC}"
