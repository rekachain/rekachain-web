<?php

use App\Support\Enums\SerialPanelManufactureStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('serial_panels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('panel_attachment_id')->constrained();
            $table->string('qr_code')->nullable()->unique();
            $table->string('qr_path')->nullable()->unique();
            $table->enum('manufacture_status',SerialPanelManufactureStatusEnum::toArray());
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('serial_panels');
    }
};
