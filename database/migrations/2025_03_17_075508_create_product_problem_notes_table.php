<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('product_problem_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_problem_id')->constrained();
            $table->text('note');
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
        if (app()->isLocal()) {
            Artisan::call('db:seed', ['--class' => 'ProductProblemNoteSeeder']);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('product_problem_notes');
    }
};
