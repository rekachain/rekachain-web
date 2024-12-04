<?php

use App\Support\Enums\TrainsetStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('trainsets', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->enum('status', TrainsetStatusEnum::toArray())->default(TrainsetStatusEnum::DRAFT->value);
            $table->foreignId('project_id')->constrained();
            $table->foreignId('preset_trainset_id')->nullable()->constrained();
            $table->integer('mechanical_time')->nullable();
            $table->integer('electrical_time')->nullable();
            $table->integer('assembly_time')->nullable();
            $table->integer('calculated_estimate_time')->nullable();
            $table->date('initial_date')->nullable();
            $table->date('estimated_end_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('trainset');
    }
};
