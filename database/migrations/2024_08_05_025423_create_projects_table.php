<?php

use App\Support\Enums\ProjectStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('status', ProjectStatusEnum::toArray())->default(ProjectStatusEnum::DRAFT->value);
            $table->text('description')->nullable();
            $table->date('initial_date')->nullable();
            $table->date('estimated_start_date')->nullable();
            $table->date('estimated_end_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('calculated_estimate_time')->nullable();
            $table->foreignId('buyer_id')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('project');
    }
};
