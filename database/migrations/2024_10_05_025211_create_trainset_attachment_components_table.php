<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trainset_attachment_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trainset_attachment_id')->constrained();
            $table->unsignedBigInteger('carriage_panel_component_id');
            $table->foreign('carriage_panel_component_id', 'fk_trainset_components_component_id')->references('id')->on('carriage_panel_components');
            $table->integer('total_required')->nullable();
            $table->integer('total_fulfilled')->nullable();
            $table->integer('total_failed')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainset_attachment_components');
    }
};
