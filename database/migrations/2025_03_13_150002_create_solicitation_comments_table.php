<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solicitation_comments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('solicitation_id')->constrained('solicitations')->onDelete('cascade');
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->text('comment');
            $table->boolean('is_internal')->default(false)->comment('Se true, apenas equipe interna vê o comentário');
            $table->timestamps();

            $table->index('solicitation_id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitation_comments');
    }
};

