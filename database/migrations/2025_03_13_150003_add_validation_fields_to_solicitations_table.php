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
        Schema::table('solicitations', function (Blueprint $table) {
            $table->enum('validation_status', ['Pendente', 'Aprovado', 'Rejeitado'])->nullable()->after('status');
            $table->foreignUuid('validated_by')->nullable()->after('validation_status')->constrained('users')->onDelete('set null');
            $table->timestamp('validated_at')->nullable()->after('validated_by');
            $table->text('validation_notes')->nullable()->after('validated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('solicitations', function (Blueprint $table) {
            $table->dropForeign(['validated_by']);
            $table->dropColumn(['validation_status', 'validated_by', 'validated_at', 'validation_notes']);
        });
    }
};

