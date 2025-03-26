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
        Schema::create('replacement_stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('component_id')->unique()->constrained();
            $table->integer('threshold')->default(0);
            $table->integer('qty');
            $table->timestamps();
        });
        if (app()->isLocal()) {
            Artisan::call('db:seed', ['--class' => 'ReplacementStockSeeder']);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('replacement_stocks');
    }
};
