<?php

use App\Support\Enums\TrainsetAttachmentHandlerHandlesEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('trainset_attachment_handlers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('handler_name')->nullable();
            $table->foreignId('trainset_attachment_id')->constrained();
            $table->enum('handles', TrainsetAttachmentHandlerHandlesEnum::toArray());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('trainset_attachment_handlers');
    }
};
