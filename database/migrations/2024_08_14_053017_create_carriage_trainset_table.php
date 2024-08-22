<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('carriage_trainset', function (Blueprint $table) {
            $table->id();
            $table->integer('qty')->default(1);
            $table->foreignId('trainset_id')->constrained()->cascadeOnDelete();
            $table->foreignId('carriage_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('carriage_trainset');
    }
};
