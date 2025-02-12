<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitacoes', function (Blueprint $table) {
            $table->id();
            $table->string('motivo'); // Campo para o motivo
            $table->string('num_voo'); // Número do voo
            $table->date('dta_voo'); // Data do voo
            $table->text('detalhe')->nullable(); // Detalhe (campo opcional)
            $table->string('registro_nasc')->nullable(); // Caminho do registro de nascimento (arquivo)
            $table->string('comprovante_res')->nullable(); // Caminho do comprovante residencial (arquivo)
            $table->string('comprovante_voo')->nullable(); // Caminho do comprovante do voo (arquivo)
            $table->boolean('notifi')->default(false); // Notificação (true/false)
            $table->string('notifi_tipo')->nullable(); // Tipo de notificação
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Relacionamento com a tabela users
            $table->timestamps();
        });

        // Adiciona a coluna solicitacao_id na tabela users
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('solicitacao_id')->nullable()->constrained('solicitacoes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Remove a coluna solicitacao_id da tabela users
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['solicitacao_id']);
            $table->dropColumn('solicitacao_id');
        });

        // Exclui a tabela solicitacoes
        Schema::dropIfExists('solicitacoes');
    }
}
