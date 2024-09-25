<?php

use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
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
        Schema::create('detail_worker_trainsets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trainset_attachment_id')->constrained();
            $table->foreignId('worker_id')->constrained('users');
            $table->foreignId('progress_step_id')->constrained();
            $table->integer('estimated_time')->nullable();
            $table->enum('work_status', DetailWorkerTrainsetWorkStatusEnum::toArray())->default(DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value);
            $table->enum('acceptance_status', DetailWorkerTrainsetAcceptanceStatusEnum::toArray())->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_worker_trainsets');
    }
};
