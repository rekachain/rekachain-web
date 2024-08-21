<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('panels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('progress_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('carriage_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('panels');
    }
};
