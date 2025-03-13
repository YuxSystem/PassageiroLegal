<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('rule', 'role');
            $table->renameColumn('cpf', 'legal_document');
            $table->renameColumn('telefone', 'phone');
            $table->renameColumn('celular', 'cellphone');
            $table->renameColumn('endereco', 'address');
            $table->renameColumn('logradouro', 'street');
            $table->renameColumn('cidade', 'city');
            $table->renameColumn('estado', 'state');
            $table->renameColumn('cep_zipcode', 'zipcode');
            $table->renameColumn('pais', 'country');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('role', 'rule');
            $table->renameColumn('legal_document', 'cpf');
            $table->renameColumn('phone', 'telefone');
            $table->renameColumn('cellphone', 'celular');
            $table->renameColumn('address', 'endereco');
            $table->renameColumn('street', 'logradouro');
            $table->renameColumn('city', 'cidade');
            $table->renameColumn('state', 'estado');
            $table->renameColumn('zipcode', 'cep_zipcode');
            $table->renameColumn('country', 'pais');
        });
    }
};
