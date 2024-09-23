<?php

use App\Support\Enums\TrainsetAttachmentStatusEnum;
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
        Schema::create('trainset_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('carriage_trainset_id')->constrained('carriage_trainset');
            $table->foreignId('source_workstation_id')->references('id')->on('workstations')->constrained();
            $table->foreignId('destination_workstation_id')->references('id')->on('workstations')->constrained();
            $table->string('attachment_number')->nullable();
            $table->string('qr_code')->nullable()->unique();
            $table->string('qr_path')->nullable()->unique();
            $table->string('elapsed_time')->nullable();
            $table->enum('status', TrainsetAttachmentStatusEnum::toArray())->nullable();
            $table->foreignId('trainset_attachment_id')->nullable()->constrained();
            $table->foreignId('supervisor_id')->nullable()->references('id')->on('users')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainset_attachments');
    }
};
