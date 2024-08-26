<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('panel_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('panel_id')->nullable()->constrained();
            //            $table->foreignId('material_id')->nullable()->constrained();
            $table->integer('qty')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('panel_materials');
    }
};
