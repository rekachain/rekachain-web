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
        Schema::create('trainset_carriages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('trainset_id');
            $table->unsignedBigInteger('carriage_id');
            $table->integer('qty');
            $table->foreign('trainset_id')->references('id')->on('trainset');
            $table->foreign('carriage_id')->references('id')->on('carriage');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainset_carriages');
    }
};
