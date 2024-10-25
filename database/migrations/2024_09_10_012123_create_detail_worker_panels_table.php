<?php

use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('detail_worker_panels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('serial_panel_id')->constrained();
            $table->foreignId('worker_id')->constrained('users');
            $table->foreignId('progress_step_id')->constrained();
            $table->integer('estimated_time')->nullable();
            $table->string('image_path')->nullable();
            $table->enum('work_status', DetailWorkerPanelWorkStatusEnum::toArray())->default(DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value);
            $table->enum('acceptance_status', DetailWorkerPanelAcceptanceStatusEnum::toArray())->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('detail_worker_panels');
    }
};