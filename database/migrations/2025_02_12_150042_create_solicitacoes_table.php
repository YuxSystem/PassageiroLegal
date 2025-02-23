<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('solicitacoes', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique()->index();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('motivo');
            $table->string('num_voo')->nullable();
            $table->date('dta_voo')->nullable();
            $table->text('detalhe')->nullable();
            $table->string('registro_nasc')->nullable();
            $table->string('comprovante_res')->nullable();
            $table->string('comprovante_voo')->nullable();
            $table->enum('status', ['Em Aberto', 'Pendente', 'Finalizado'])->default('Em Aberto');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('solicitacoes');
    }
};

