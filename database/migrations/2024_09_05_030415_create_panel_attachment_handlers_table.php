<?php

use App\Support\Enums\PanelAttachmentHandlerHandlesEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('panel_attachment_handlers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('handler_name')->nullable();
            $table->foreignId('panel_attachment_id')->constrained();
            $table->enum('handles', PanelAttachmentHandlerHandlesEnum::toArray());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('panel_attachment_handlers');
    }
};
