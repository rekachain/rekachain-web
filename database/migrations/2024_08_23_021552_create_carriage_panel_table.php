<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('carriage_panels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('progress_id')->constrained()->cascadeOnDelete();
            $table->foreignId('carriage_trainset_id')->constrained('carriage_trainset')->cascadeOnDelete();
            $table->foreignId('panel_id')->constrained()->cascadeOnDelete();
            $table->integer('qty')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('carriage_panel');
    }
};
