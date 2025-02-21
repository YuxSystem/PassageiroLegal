<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('cpf')->nullable()->unique()->after('email');
            $table->string('telefone')->nullable()->after('cpf');
            $table->string('celular')->nullable()->after('telefone');
            $table->string('endereco')->nullable()->after('celular');
            $table->string('logradouro')->nullable()->after('endereco');
            $table->string('cidade')->nullable()->after('logradouro');
            $table->string('estado')->nullable()->after('cidade');
            $table->string('cep_zipcode')->nullable()->after('estado');
            $table->string('pais')->nullable()->after('cep_zipcode');
            $table->enum('rule', ['Admin', 'User'])->default('User')->after('pais');
            $table->enum('status', ['Ativo', 'Excluido'])->default('Ativo')->after('rule');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['cpf', 'telefone', 'celular', 'endereco', 'logradouro', 'cidade', 'estado', 'cep_zipcode', 'pais', 'rule', 'status']);
        });
    }
};
